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
  DprPublicCommentsApiResponse,
  SearchParamsComments,
} from "@/types";
import { handleBopsGetRequest } from "../requests";
import { defaultPagination } from "@/handlers/lib";
import { BopsV2PublicPlanningApplicationPublicComments } from "../types";

/**
 * Get the public comments for an application
 * @param page
 * @param resultsPerPage
 * @param query
 * @param sortBy
 * @param orderBy
 * @param council
 * @param reference
 * @returns
 */
export async function publicComments(
  council: string,
  reference: string,
  searchParams?: SearchParamsComments,
): Promise<ApiResponse<DprPublicCommentsApiResponse | null>> {
  let url = `public/planning_applications/${reference}/comments/public`;

  if (searchParams) {
    const params = new URLSearchParams({
      page: searchParams?.page?.toString(),
      maxresults: searchParams?.resultsPerPage?.toString() ?? "10",
    });

    if (searchParams.query) {
      params.append("q", searchParams.query);
    }
    if (searchParams.sortBy) {
      params.append("sortBy", searchParams.sortBy);
    }
    if (searchParams.orderBy) {
      params.append("orderBy", searchParams.orderBy);
    }
    url = `${url}?${params.toString()}`;
  }

  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationPublicComments | null>
  >(council, url);

  if (!request.data) {
    return {
      ...request,
      data: null,
      pagination: defaultPagination,
    };
  }

  const { comments, summary, pagination } = request.data;
  return {
    ...request,
    data: {
      comments,
      summary,
    },
    pagination: pagination,
  };
}
