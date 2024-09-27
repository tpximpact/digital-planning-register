"use server";

import { ApiResponse } from "@/types";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/api/handlers/bops/types";
import { handleBopsPostRequest } from "../requests";

/**
 * POST planning_applications/${id}/neighbour_responses
 * Post a comment to BOPS
 * @param id
 * @param council
 * @param apiData
 * @returns
 */
export async function postComment(
  council: string,
  applicationId: number,
  apiData: object,
): Promise<ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>> {
  const url = `planning_applications/${applicationId}/neighbour_responses`;
  const request = await handleBopsPostRequest<
    ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>
  >(council, url, apiData, true);

  return request;
}
