"use server";

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
export async function getDSNApplication(
  page: number = 1,
  resultsPerPage: number = 10,
  council: string,
  search?: string,
): Promise<ApiResponse<DSNApplicationListings | null>> {
  const params = new URLSearchParams({
    page: page.toString(),
    maxresults: resultsPerPage.toString(),
  });

  if (search) {
    params.append("q", search);
  }

  const url = `planning_applications?${params.toString()}`;
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
