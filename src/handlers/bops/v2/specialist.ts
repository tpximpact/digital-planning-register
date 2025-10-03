/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import {
  ApiResponse,
  DprSpecialistApiResponse,
  SearchParamsSpecialistComments,
} from "@/types";
import { getAppConfig } from "@/config";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP/comments/specialist
 * @param page
 * @param resultsPerPage
 * @param query
 * @param sortBy
 * @param orderBy
 * @param council
 * @param reference
 * @returns
 */
export async function specialist(
  council: string,
  reference: string,
  specialistId: string,
  searchParams: SearchParamsSpecialistComments,
): Promise<ApiResponse<DprSpecialistApiResponse | null>> {
  let url = `${process.env.DPR_BACKEND_URL}/api/@next/public/applications/${reference}/specialistComments/${specialistId}`;

  if (searchParams) {
    const params = new URLSearchParams({
      page: searchParams?.page?.toString(),
      resultsPerPage: searchParams?.resultsPerPage?.toString() ?? "10",
    });

    if (searchParams.query) {
      params.append("query", searchParams.query);
    }
    if (searchParams.sortBy) {
      params.append("sortBy", searchParams.sortBy);
    }
    if (searchParams.orderBy) {
      params.append("orderBy", searchParams.orderBy);
    }
    url = `${url}?${params.toString()}`;
  }

  const config = getAppConfig(council);
  const revalidateConfig = config.defaults.revalidate;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-client": council,
      "x-service": "DPR frontend bops handler",
    },
    next: {
      revalidate: revalidateConfig,
    },
  });

  if (!response.ok) {
    return {
      data: null,
      status: {
        code: 500,
        message: "Something went wrong fetching from the backend",
      },
    };
  }
  const data = await response.json();

  return data;
}
