"use server";

import { getAppConfig } from "@/config";
import {
  ApiResponse,
  DprPlanningApplication,
  DprSearchApiResponse,
  SearchParams,
} from "@/types";
import {
  generateDprApplication,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";

const responseQuery = (
  searchParams?: SearchParams,
): ApiResponse<DprSearchApiResponse | null> => {
  const appConfig = getAppConfig();
  const resultsPerPage = appConfig.defaults.resultsPerPage;

  const applications = generateNResults<DprPlanningApplication>(
    resultsPerPage,
    generateDprApplication,
  );
  const pagination = generatePagination(searchParams?.page);

  // if we've done a search just rename the first result to match the query
  if (searchParams?.query) {
    applications[0].application.reference = searchParams.query;
  }

  let data: DprSearchApiResponse | null = applications;

  if (searchParams?.query === "noresultsplease") {
    data = null;
  }

  return {
    data,
    pagination,
    status: {
      code: 200,
      message: "",
    },
  };
};

export const search = async (
  searchParams?: SearchParams,
): Promise<ApiResponse<DprSearchApiResponse | null>> => {
  return await Promise.resolve(responseQuery(searchParams));
};
