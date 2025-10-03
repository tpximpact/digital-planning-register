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

"use server";

import { ApiResponse, DprShowApiResponse } from "@/types";
import { getDecisionNoticeUrl } from "../actions/getDecisionNoticeUrl";
import { getAppConfig } from "@/config";
import {
  getApplicationDprDecisionSummary,
  getApplicationDprStatusSummary,
} from "@/lib/planningApplication";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function show(
  council: string,
  reference: string,
): Promise<ApiResponse<DprShowApiResponse | null>> {
  const url = `${process.env.DPR_BACKEND_URL}/api/@next/public/applications/${reference}`;

  const config = getAppConfig(council);
  const revalidateConfig = config.defaults.revalidate;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-client": council,
      "x-service": "DPR frontend bops handler",
    },
    next: {
      revalidate: revalidateConfig,
    },
  });

  if (!response.ok) {
    return {
      data: null,
      status: {
        code: 500,
        message: "Something went wrong fetching from the backend",
      },
    };
  }

  const data = await response.json();
  const application = data.data;

  const decisionNoticeUrl = await getDecisionNoticeUrl(council, reference);

  if (decisionNoticeUrl) {
    if (application?.data && application?.data?.assessment) {
      application.data.assessment.decisionNotice = { url: decisionNoticeUrl };
    }
  }

  let applicationStatusSummary:
    | ReturnType<typeof getApplicationDprStatusSummary>
    | undefined;
  let applicationDecisionSummary:
    | ReturnType<typeof getApplicationDprDecisionSummary>
    | undefined;

  if (application?.data && application?.data?.assessment) {
    applicationDecisionSummary = getApplicationDprDecisionSummary(application);
  }
  if (application?.data && application?.data?.application) {
    applicationStatusSummary = getApplicationDprStatusSummary(application);
  }

  const convertedApplication = {
    ...application,
    applicationStatusSummary,
    applicationDecisionSummary,
  };

  return { ...data, data: convertedApplication };
}
