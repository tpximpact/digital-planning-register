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
  DprSpecialistCommentsApiResponse,
  SearchParamsComments,
} from "@/types";
import { convertCommentBops } from "../converters/comments";
import { handleBopsGetRequest } from "../requests";
import { BopsV2PublicPlanningApplicationSpecialistComments } from "../types";
import { defaultPagination } from "@/handlers/lib";

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
 * @param sentiment
 * @param publishedAtFrom
 * @param publishedAtTo
 * @returns
 */
export async function specialistComments(
  council: string,
  reference: string,
  searchParams?: SearchParamsComments,
): Promise<ApiResponse<DprSpecialistCommentsApiResponse | null>> {
  let url = `public/planning_applications/${reference}/comments/specialist`;

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
    if (searchParams.sentiment) {
      params.append("sentiment", searchParams.sentiment);
    }
    if (searchParams.publishedAtFrom) {
      params.append("publishedAtFrom", searchParams.publishedAtFrom);
      if (searchParams.publishedAtTo === "") {
        params.append("publishedAtTo", new Date().toISOString().split("T")[0]);
      }
    }
    if (searchParams.publishedAtTo) {
      params.append("publishedAtTo", searchParams.publishedAtTo);
      if (searchParams.publishedAtFrom === "") {
        const date = new Date(searchParams.publishedAtTo);
        date.setDate(date.getDate() - 1);
        params.append("publishedAtFrom", date.toISOString().split("T")[0]);
      }
    }
    url = `${url}?${params.toString()}`;
  }

  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationSpecialistComments | null>
  >(council, url);

  if (!request.data) {
    return {
      ...request,
      data: null,
      pagination: defaultPagination,
    };
  }

  const { comments: bopsComments, summary, pagination } = request.data;

  const transformedComments = bopsComments.map(convertCommentBops);

  return {
    ...request,
    data: {
      comments: transformedComments,
      summary,
    },
    pagination: pagination,
  };
}
