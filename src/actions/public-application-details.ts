"use server";

import { convertPlanningApplicationBops } from "@/lib/applications";
import { handleBopsGetRequest } from "@/lib/handlers";
import { ApiResponse, DprPublicApplicationDetails } from "@/types";
import {
  BopsV2PublicPlanningApplicationDetail,
  BopsV2PlanningApplicationDetail,
} from "@/types/api/bops";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function getPublicApplicationDetails(
  council: string,
  reference: string,
): Promise<ApiResponse<DprPublicApplicationDetails | null>> {
  const url = `public/planning_applications/${reference}`;
  const missing_data_url = `planning_applications/${reference}`;

  const [request, missing_data_request] = await Promise.all([
    handleBopsGetRequest<
      ApiResponse<BopsV2PublicPlanningApplicationDetail | null>
    >(council, url),
    handleBopsGetRequest<ApiResponse<BopsV2PlanningApplicationDetail | null>>(
      council,
      missing_data_url,
    ),
  ]);

  const convertedData = request?.data
    ? convertPlanningApplicationBops(
        council,
        request.data,
        missing_data_request?.data,
      )
    : null;

  return { ...request, data: convertedData };
}
