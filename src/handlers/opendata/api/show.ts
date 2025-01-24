"use server";

import { ApiResponse, DprShowApiResponse } from "@/types";

import { handleOpenDataGetRequest } from "../requests";
import { convertOpenDataToDpr } from "../converters/planningApplication";
import { OpenDataApplication } from "../types/definitions";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function show(
  council: string,
  reference: string,
): Promise<ApiResponse<DprShowApiResponse | null>> {
  let url = "";
  const params = new URLSearchParams({
    $where: `application_number='${reference.replaceAll("-", "/")}'`,
  });
  url = `${url}?${params.toString()}`;

  const request = await handleOpenDataGetRequest<
    ApiResponse<OpenDataApplication[] | null>
  >(council, url);

  const convertedData = request?.data
    ? convertOpenDataToDpr(council, request.data[0])
    : null;

  return { ...request, data: convertedData };
}
