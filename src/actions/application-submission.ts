"use server";

import { handleBopsGetRequest } from "@/lib/handlers";
import { ApiResponse } from "@/types";
import { BopsV2PlanningApplicationsSubmission } from "@/types/api/bops";

/**
 * GET /api/v2/planning_applications/{reference}/submission
 * get an application's submission data
 * @param reference
 * @param council
 * @returns
 */
export async function getApplicationSubmission(
  reference: string,
  council: string,
): Promise<ApiResponse<BopsV2PlanningApplicationsSubmission | null>> {
  const url = `planning_applications/${reference}/submission`;
  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PlanningApplicationsSubmission | null>
  >(council, url);
  return request;
}
