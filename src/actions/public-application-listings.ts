"use server";

import { convertPlanningApplicationBops } from "@/lib/applications";
import { handleBopsGetRequest } from "@/lib/handlers";
import { defaultPagination } from "@/lib/pagination";
import { ApiResponse, DprPublicApplicationListings } from "@/types";
import { BopsV2PublicPlanningApplicationsSearch } from "@/types/api/bops";
import { updateCouncilConfig } from "@/lib/config";
import { Config } from "@/types";
import config from "../../util/config.json";

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
  page: number = 1,
  resultsPerPage: number = 10,
  council: string,
  search?: string,
): Promise<ApiResponse<DprPublicApplicationListings | null>> {
  const params = new URLSearchParams({
    page: page.toString(),
    maxresults: resultsPerPage.toString(),
  });

  if (search) {
    params.append("q", search);
  }
  const url = `public/planning_applications/search?${params.toString()}`;
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

export const getConfig = async (): Promise<Config> => {
  const councilConfig: Config = config;

  Object.keys(config).forEach((council) => {
    councilConfig[council] = updateCouncilConfig(
      council,
      councilConfig[council],
    );
  });
  return config;
};
