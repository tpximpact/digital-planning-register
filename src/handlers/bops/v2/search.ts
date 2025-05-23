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

"use server";

import {
  ApiResponse,
  DprPagination,
  DprApplication,
  DprPlanningApplication,
  DprSearchApiResponse,
  SearchParams,
} from "@/types";
import { BopsV2PublicPlanningApplicationsSearch } from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";
import { defaultPagination } from "@/handlers/lib";
import {
  convertBopsToDpr,
  convertBopsToDprPagination,
} from "../converters/planningApplication";
import {
  convertToDprApplication,
  isDprApplication,
} from "@/lib/planningApplication/converter";

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

  const { data: planningApplications = [] } = request.data || {};

  const convertedApplications = planningApplications.map((application) =>
    convertBopsToDpr(application, council),
  );

  const errors: {
    app: DprPlanningApplication;
    reference: string;
    error: unknown;
  }[] = [];

  const dprApplications: DprApplication[] = convertedApplications
    .map((application) => {
      try {
        return isDprApplication(application)
          ? application
          : convertToDprApplication(application);
      } catch (error) {
        console.error("Error converting application:", error);
        errors.push({
          app: application,
          reference: application.application.reference,
          error,
        });
        return null;
      }
    })
    .filter((app): app is DprApplication => app !== null);

  if (errors.length > 0) {
    console.warn("Some applications failed to convert:", errors);
  }
  const metadata = request.data?.metadata;
  const pagination: DprPagination =
    metadata && "results" in metadata
      ? convertBopsToDprPagination(metadata)
      : defaultPagination;

  return {
    ...request,
    data: dprApplications,
    pagination,
  };
}
