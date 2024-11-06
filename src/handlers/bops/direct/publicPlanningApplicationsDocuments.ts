"use server";

import { ApiResponse, DprDocumentsApiResponse } from "@/types";
import { BopsV2PublicPlanningApplicationDetail } from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP/documents
 * @param council
 * @param reference
 * @returns
 */
export async function publicPlanningApplicationsDocuments(
  council: string,
  reference: string,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> {
  const url = `public/planning_applications/${reference}/documents`;

  const request = handleBopsGetRequest<
    ApiResponse<DprDocumentsApiResponse | null>
  >(council, url);

  return request;
}
