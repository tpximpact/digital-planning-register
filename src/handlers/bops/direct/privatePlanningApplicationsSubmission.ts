"use server";

import { ApiResponse } from "@/types";
import { BopsV2PlanningApplicationsSubmission } from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function privatePlanningApplicationsSubmission(
  council: string,
  reference: string,
): Promise<ApiResponse<BopsV2PlanningApplicationsSubmission | null>> {
  const url = `planning_applications/${reference}/submission`;
  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PlanningApplicationsSubmission | null>
  >(council, url);

  return request;
}
