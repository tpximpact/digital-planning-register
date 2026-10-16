/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import "server-only";

import { getAppConfig } from "@/config";
import { trackServer } from "@/lib/dprAnalytics";
import {
  getApplicationDprDecisionSummary,
  getApplicationDprStatusSummary,
} from "@/lib/planningApplication";
import type {
  ApiResponse,
  DprApplication,
  DprApplicationPostCommentApiResponse,
  DprShowApiResponse,
} from "@/types";
import { apiReturnError, detailMessage } from "../lib/api";
import type { ExternalExtras } from ".";

/* -------------------------------------------------------------------------- */
/*  Direct access to the council's own BOPS API                               */
/*  Only needed for the few things the DPR backend does not expose.           */
/* -------------------------------------------------------------------------- */

interface BopsRequest {
  method?: "GET" | "POST";
  body?: unknown;
  /** Use the v1 API url, `<COUNCIL>_BOPS_API_URL_V1` */
  v1?: boolean;
}

async function bopsRequest<T>(
  council: string,
  path: string,
  { method = "GET", body, v1 = false }: BopsRequest = {},
): Promise<ApiResponse<T | null>> {
  const prefix = council.toUpperCase();
  const baseUrl = process.env[`${prefix}_BOPS_API_URL${v1 ? "_V1" : ""}`];

  if (!baseUrl) {
    return {
      data: null,
      status: {
        code: 404,
        message: "Couldn't find requested endpoint",
        detail: "Council not registered",
      },
    } as ApiResponse<null>;
  }

  const init: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${process.env[`${prefix}_BOPS_API_KEY`]}`,
      ...(body !== undefined && { "Content-Type": "application/json" }),
    },
  };

  if (method === "GET") {
    init.next = { revalidate: getAppConfig(council).defaults.revalidate };
  } else {
    init.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, init);
    const payload = await response.json().catch(() => null);
    const status = { code: response.status, message: response.statusText };

    if (!response.ok) {
      return {
        data: null,
        status: { ...status, detail: payload?.error?.detail ?? payload },
      } as ApiResponse<null>;
    }

    return { data: payload, status } as ApiResponse<T>;
  } catch (error) {
    return {
      data: null,
      status: {
        code: 500,
        message: "Internal server error",
        detail: error instanceof Error ? error.message : String(error),
      },
    } as ApiResponse<null>;
  }
}

const isSuccess = (code: number) => code >= 200 && code < 300;

/* -------------------------------------------------------------------------- */
/*  Extras                                                                    */
/* -------------------------------------------------------------------------- */

const getDecisionNoticeUrl = async (council: string, reference: string) => {
  const response = await bopsRequest<{ decisionNotice?: { url?: string } }>(
    council,
    `public/planning_applications/${reference}/documents?page=1&resultsPerPage=1`,
  );
  return response.data?.decisionNotice?.url;
};

const withSummaries = (application: DprApplication) =>
  ({
    ...application,
    applicationStatusSummary: getApplicationDprStatusSummary(application),
    applicationDecisionSummary: getApplicationDprDecisionSummary(application),
  }) as DprApplication;

/**
 * What a BOPS source needs on top of the generic external handler.
 */
export const bopsExtras: ExternalExtras = {
  afterSearch: (response) =>
    Array.isArray(response.data)
      ? { ...response, data: response.data.map(withSummaries) }
      : response,

  afterShow: async (council, reference, response) => {
    const application = response.data;
    if (!application) return response;

    const assessment = application.data?.assessment;

    // the decision notice only lives in the assessment, so only ask for it then
    if (assessment) {
      const url = await getDecisionNoticeUrl(council, reference);
      if (url) assessment.decisionNotice = { url };
    }

    return {
      ...response,
      data: {
        ...application,
        applicationStatusSummary: application.data?.application
          ? getApplicationDprStatusSummary(application)
          : undefined,
        applicationDecisionSummary: assessment
          ? getApplicationDprDecisionSummary(application)
          : undefined,
      } as DprShowApiResponse,
    };
  },

  // Comments are posted straight to BOPS (v1 neighbour responses), which needs
  // the BOPS application id rather than the reference
  postComment: async (council, reference, apiData) => {
    const { features } = getAppConfig(council);

    const application = features?.getApplicationIdFromPrivateEndpoint
      ? await bopsRequest<{ id?: number }>(
          council,
          `planning_applications/${reference}`,
        )
      : undefined;

    const applicationId = application?.data?.id;
    if (!applicationId) {
      return apiReturnError("Missing required field(s): applicationId");
    }

    const response = await bopsRequest<DprApplicationPostCommentApiResponse>(
      council,
      `planning_applications/${applicationId}/neighbour_responses`,
      { method: "POST", body: apiData, v1: true },
    );

    if (!isSuccess(response.status.code)) {
      return apiReturnError(
        detailMessage(response.status.detail, "Failed to post comment"),
      );
    }

    await trackServer("commentSuccessfullySubmitted", {
      message: `Comment for application ${reference} at ${council} successfully submitted`,
    });

    return response;
  },
};
