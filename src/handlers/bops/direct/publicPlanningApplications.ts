"use server";

import { ApiResponse } from "@/types";
import { BopsV2PublicPlanningApplicationDetail } from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function publicPlanningApplications(
  council: string,
  reference: string,
): Promise<ApiResponse<BopsV2PublicPlanningApplicationDetail | null>> {
  const url = `public/planning_applications/${reference}`;

  const request = handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationDetail | null>
  >(council, url);

  return request;
}
