"use server";

import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";
import { BopsV2PublicPlanningApplicationsSearch } from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";
import { defaultPagination } from "@/handlers/lib";
import { convertBopsToDpr } from "../converters/planningApplication";

/**
 * Get list of public applications, also used for search
 * https://camden.bops-staging.services/api/v2/public/planning_applications/search?page=3&maxresults=8
 * @param page
 * @param resultsPerPage
 * @param council
 * @param search
 * @returns
 */
export async function search(
  council: string,
  search?: SearchParams,
): Promise<ApiResponse<DprSearchApiResponse | null>> {
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

  const { data: planningApplications = [], ...restData } = request.data || {};

  const convertedApplications = planningApplications.map((application) =>
    convertBopsToDpr(application),
  );

  return {
    ...request,
    data: convertedApplications,
    pagination: request.data?.metadata ?? defaultPagination,
  };
}
