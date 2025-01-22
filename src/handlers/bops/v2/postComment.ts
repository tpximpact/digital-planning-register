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

  if (appConfig.features.getApplicationIdFromPrivateEndpoint) {
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
