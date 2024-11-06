"use server";

import { ApiResponse, SearchParams } from "@/types";
import {
  BopsV2PublicPlanningApplicationDetail,
  BopsV2PublicPlanningApplicationsSearch,
} from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function publicPlanningApplicationsSearch(
  council: string,
  search?: SearchParams,
): Promise<ApiResponse<BopsV2PublicPlanningApplicationsSearch | null>> {
  let url = `public/planning_applications/search`;

  if (search) {
    const params = new URLSearchParams({
      page: search?.page?.toString(),
      maxresults: search?.resultsPerPage?.toString() ?? "10",
    });

    if (search?.query) {
      params.append("q", search?.query);
    }

    url = `${url}?${params.toString()}`;
  }
  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationsSearch | null>
  >(council, url);

  return request;
}
