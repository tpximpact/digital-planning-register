"use server";

import { SearchParams } from "@/api/types";
import { convertPlanningApplicationBops } from "@/lib/applications";
import { handleBopsGetRequest } from "@/lib/handlers";
import { defaultPagination } from "@/lib/pagination";
import { ApiResponse, DprPublicApplicationListings } from "@/types";
import { BopsV2PublicPlanningApplicationsSearch } from "@/types/api/bops";

/**
 * Get list of public applications, also used for search
 * https://camden.bops-staging.services/api/v2/public/planning_applications/search?page=3&maxresults=8
 * @param page
 * @param resultsPerPage
 * @param council
 * @param search
 * @returns
 */
export async function getPublicApplications(
  council: string,
  search?: SearchParams,
): Promise<ApiResponse<DprPublicApplicationListings | null>> {
  let url = `public/planning_applications/search`;

  if (search) {
    const params = new URLSearchParams({
      page: search?.page?.toString(),
      maxresults: search?.resultsPerPage.toString(),
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

  const convertedData = {
    pagination: request.data?.metadata ?? defaultPagination,
    data: planningApplications.map((application) =>
      convertPlanningApplicationBops(council, application),
    ),
  };

  return { ...request, data: convertedData };
}
