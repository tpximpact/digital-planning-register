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
import {
  BopsV1PlanningApplicationsNeighbourResponse,
  BopsV2PlanningApplicationDetail,
} from "@/handlers/bops/types";
import { handleBopsGetRequest, handleBopsPostRequest } from "../requests";
import { apiReturnError } from "@/handlers/lib";
import { getAppConfig } from "@/config";

/**
 * POST planning_applications/${id}/neighbour_responses
 * Post a comment to BOPS
 * @param reference
 * @param council
 * @param apiData
 * @returns
 */
export async function postComment(
  council: string,
  reference: string,
  apiData: object,
): Promise<ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>> {
  const appConfig = getAppConfig(council);
  let applicationId = undefined;

  if (appConfig.features?.getApplicationIdFromPrivateEndpoint) {
    const privateApplicationData = await handleBopsGetRequest<
      ApiResponse<BopsV2PlanningApplicationDetail | null>
    >(council, `planning_applications/${reference}`);

    applicationId = privateApplicationData.data?.id;
  }

  const missingFields = [];
  if (!council) missingFields.push("council");
  if (!reference) missingFields.push("reference");
  if (!applicationId) missingFields.push("applicationId");

  if (missingFields.length > 0) {
    return apiReturnError(
      `Missing required field(s): ${missingFields.join(", ")}`,
    );
  }

  const url = `planning_applications/${applicationId}/neighbour_responses`;
  const postRequest = await handleBopsPostRequest<
    ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>
  >(council, url, apiData, true);

  return postRequest;
}
