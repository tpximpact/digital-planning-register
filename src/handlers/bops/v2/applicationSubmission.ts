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
import { BopsV2PlanningApplicationsSubmission } from "@/handlers/bops/types";
import { DprApplicationSubmissionApiResponse } from "@/types";
import { handleBopsGetRequest } from "../requests";

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
  const url = `public/planning_applications/${reference}/submission`;
  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PlanningApplicationsSubmission | null>
  >(council, url);

  if (request.status.code !== 200) {
    return {
      data: null,
      status: request.status,
    };
  } else {
    return {
      data: {
        submission: request.data?.submission ? request.data?.submission : null,
      },
      status: {
        code: 200,
        message: "OK",
      },
    };
  }
}
