"use server";

import { ApiResponse, DprShowApiResponse } from "@/types";
import {
  BopsV2PublicPlanningApplicationDetail,
  BopsV2PlanningApplicationDetail,
} from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";
import { getAppConfig } from "@/config";
import { convertBopsToDpr } from "../converters/planningApplication";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function show(
  council: string,
  reference: string,
): Promise<ApiResponse<DprShowApiResponse | null>> {
  const appConfig = getAppConfig(council);

  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationDetail | null>
  >(council, `public/planning_applications/${reference}`);

  const convertedData = request?.data ? convertBopsToDpr(request.data) : null;

  return { ...request, data: convertedData };
}
