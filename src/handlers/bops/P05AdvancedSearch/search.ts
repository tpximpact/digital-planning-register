"use server";

import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";
import { BopsV2PublicPlanningApplicationsSearch } from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";
import { convertPlanningApplicationBops } from "../converters";
import { defaultPagination } from "@/handlers/lib";

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
  const dsnApplicationIds = await getDsnApplicationIds(council, search);

  let url = `public/planning_applications/search`;

  if (search) {
    const params = new URLSearchParams({
      page: search?.page?.toString(),
      maxresults: search?.resultsPerPage?.toString() ?? "10",
      // @TODO implement advanced search query format that will
      // be passed to the API and filter for the DSNs in the best way we can determine
      // queryFields: {
      //   isDsn: true,
      // },
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

  const fakePagination = {
    from: request.data?.metadata?.from ?? 1,
    page: request.data?.metadata?.page ?? 1,
    results: dsnApplicationIds.length,
    to: request.data?.metadata?.to ?? 10,
    total_pages:
      dsnApplicationIds.length > 10
        ? (request.data?.metadata?.total_pages ?? 1)
        : 1,
    total_results: dsnApplicationIds.length ?? 0,
  };

  const convertedData = {
    pagination:
      dsnApplicationIds.length > 0 ? fakePagination : defaultPagination,
    data: planningApplications
      .filter((ap) => dsnApplicationIds.includes(ap.application.reference))
      .map((application) =>
        convertPlanningApplicationBops(council, application),
      ),
  };

  return { ...request, data: convertedData };
}

const getDsnApplicationIds = async (council: string, search?: SearchParams) => {
  const page = search?.page ? search.page : 1;
  const url = `planning_applications?maxresults=30&page=${page}`;
  const request = await handleBopsGetRequest<ApiResponse<any | null>>(
    council,
    url,
  );

  if (request.data?.data) {
    return request.data?.data
      .filter((ap: any) => ap.site_notice_content)
      .map((ap: any) => ap.reference);
  } else {
    return [];
  }
};
