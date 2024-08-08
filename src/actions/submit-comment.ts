"use server";

import { handleBopsPostRequest } from "@/lib/handlers";
import { ApiResponse } from "@/types";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/types/api/bops";

/**
 * POST planning_applications/${id}/neighbour_responses
 * Post a comment to BOPS
 * @param id
 * @param council
 * @param apiData
 * @returns
 */
export async function postComment(
  id: number,
  council: string,
  apiData: object,
): Promise<ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>> {
  const url = `planning_applications/${id}/neighbour_responses`;
  const request = await handleBopsPostRequest<
    ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>
  >(council, url, apiData, true);
  return request;
}
