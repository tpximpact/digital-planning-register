"use server";

import { ApiResponse } from "@/types";
import {
  BopsV1PlanningApplicationsNeighbourResponse,
  BopsV2PlanningApplicationDetail,
} from "@/handlers/bops/types";
import { handleBopsGetRequest, handleBopsPostRequest } from "../requests";
import { apiReturnError } from "@/handlers/lib";

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
  if (!reference) {
    return apiReturnError("Reference is required");
  }
  const privateApplicationData = await handleBopsGetRequest<
    ApiResponse<BopsV2PlanningApplicationDetail | null>
  >(council, `planning_applications/${reference}`);

  const applicationId = privateApplicationData.data?.id;

  if (!applicationId) {
    return apiReturnError("ApplicationId is required");
  }
  const url = `planning_applications/${applicationId}/neighbour_responses`;
  const postRequest = await handleBopsPostRequest<
    ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>
  >(council, url, apiData, true);

  return postRequest;
}
