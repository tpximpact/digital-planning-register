"use server";

import { SearchParams } from "@/api/types";
import { handleBopsGetRequest } from "@/lib/handlers";
import { DSNApplicationListings } from "@/types/schemas/digital-site-notice";
import { ApiResponse } from "@/types";
import { BopsV2Determined } from "@/types/api/bops";
import { defaultPagination } from "@/lib/pagination";

/**
 Get list of application that has digital site notice
 * @param page
 * @param resultsPerPage
 * @param search
 * @param council
 * @returns
 */
export async function getPlanningApplications(
  council: string,
  search?: SearchParams,
): Promise<ApiResponse<DSNApplicationListings | null>> {
  console.log("getPlanningApplications");
  let url = `planning_applications`;

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
    ApiResponse<BopsV2Determined | null>
  >(council, url);

  const { data: planningApplications = [], ...restData } = request.data || {};

  const convertedData = {
    pagination: request.data?.metadata ?? defaultPagination,
    data: planningApplications
      .map((application) => application)
      .filter((ap) => ap.site_notice_content),
  };

  return { ...request, data: convertedData };
}
