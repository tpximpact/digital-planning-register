"use server";

import { ApiResponse } from "@/types";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/handlers/bops/types";
import { handleBopsPostRequest } from "../requests";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function privatePlanningApplicationsComment(
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
