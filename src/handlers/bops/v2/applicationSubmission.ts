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

import { ApiResponse } from "@/types";
import { DprApplicationSubmissionApiResponse } from "@/types";
import { getAppConfig } from "@/config";

/**
 * GET /api/v2/planning_applications/{reference}/submission
 * get an application's submission data
 * @param reference
 * @param council
 * @returns
 */
export async function applicationSubmission(
  council: string,
  reference: string,
): Promise<ApiResponse<DprApplicationSubmissionApiResponse | null>> {
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

  const submission = data.data.submission;

  return { ...data, data: submission };
}
