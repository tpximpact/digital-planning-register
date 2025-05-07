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
import { BopsV2PublicPlanningApplicationPublicComments } from "../types";
import { convertCommentBops } from "../converters/comments";
import { defaultPagination } from "@/handlers/lib";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP/comments/public
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
    if (searchParams.sentiment) {
      params.append("sentiment", searchParams.sentiment);
    }
    if (searchParams.topic) {
      params.append("topic", searchParams.topic);
    }
    if (searchParams.publishedAtFrom && searchParams.publishedAtTo) {
      params.append("publishedAtFrom", searchParams.publishedAtFrom);
      params.append("publishedAtTo", searchParams.publishedAtTo);
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
