"use server";

import {
  ApiResponse,
  DprPlanningApplication,
  DprSearchApiResponse,
  SearchParams,
} from "@/types";
import { handleOpenDataGetRequest } from "../requests";
import { defaultPagination } from "@/handlers/lib";
import { convertOpenDataToDpr } from "../converters/planningApplication";
import { OpenDataApplication } from "../types/definitions";
import { getAppConfig } from "@/config";
import { createItemPagination } from "@/lib/pagination";

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
  const appConfig = getAppConfig(council);
  let url = "";

  const resultsPerPage = appConfig.defaults.resultsPerPage ?? 10;
  const params = new URLSearchParams({
    $limit: resultsPerPage.toString(),
    $order: "registered_date DESC",
  });

  if (search) {
    if (search?.page) {
      params.append(
        "$offset",
        ((search.page - 1) * search.resultsPerPage).toString(),
      );
    }

    if (search?.query) {
      params.append("$where=", `application_number='${search?.query}'`);
    }
  }

  url = `${url}?${params.toString()}`;

  const [request, totalItemsRequest] = await Promise.all([
    handleOpenDataGetRequest<ApiResponse<OpenDataApplication[] | null>>(
      council,
      url,
    ),
    handleOpenDataGetRequest<ApiResponse<any | null>>(
      council,
      `?$select=count(*)`,
    ),
  ]);

  const totalItems = totalItemsRequest.data[0].count
    ? parseInt(totalItemsRequest.data[0].count)
    : 0;

  const planningApplications = request.data || [];

  const convertedData = {
    pagination: createItemPagination(
      totalItems,
      search?.page ?? 1,
      resultsPerPage,
    ),
    data: planningApplications.map((application) =>
      convertOpenDataToDpr(council, application),
    ),
  };

  return { ...request, data: convertedData };
}
