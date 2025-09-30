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
import { handleBopsGetRequest } from "../requests";
import {
  BopsSpecialist,
  BopsV2PublicPlanningApplicationSpecialistComments,
} from "../types";
import { defaultPagination } from "@/handlers/lib";
import {
  SpecialistCommentRedacted,
  SpecialistRedacted,
} from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import { convertBopsSpecialist } from "../converters/comments";
import { paginateArray } from "@/util/paginate-array";

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
  let page = searchParams?.page ?? 1;
  const resultsPerPage = searchParams?.resultsPerPage ?? 10;
  let findSpecialist: BopsSpecialist | undefined = undefined;
  let foundSpecialist: SpecialistRedacted | undefined = undefined;
  let lastRequest:
    | ApiResponse<BopsV2PublicPlanningApplicationSpecialistComments | null>
    | undefined;
  let totalPages = 1;

  // Paginate through comments until we find the specialistId or run out of pages
  do {
    let url = `public/planning_applications/${reference}/comments/specialist`;
    const params = new URLSearchParams({
      page: page.toString(),
      resultsPerPage: resultsPerPage.toString(),
    });

    if (searchParams?.query) params.append("query", searchParams.query);
    if (searchParams?.sortBy) params.append("sortBy", searchParams.sortBy);
    if (searchParams?.orderBy) params.append("orderBy", searchParams.orderBy);

    url = `${url}?${params.toString()}`;

    const request = await handleBopsGetRequest<
      ApiResponse<BopsV2PublicPlanningApplicationSpecialistComments | null>
    >(council, url);

    lastRequest = request;

    if (!request.data) {
      return {
        ...request,
        data: null,
        pagination: defaultPagination,
      };
    }

    const {
      data: { comments: bopsComments },
      pagination,
    } = request.data;

    findSpecialist =
      bopsComments.find(
        (comment) =>
          String(comment.id).toLowerCase() ===
          String(specialistId).toLowerCase(),
      ) ?? undefined;

    foundSpecialist = findSpecialist
      ? convertBopsSpecialist(findSpecialist)
      : undefined;

    // Determine total pages from pagination info if available
    totalPages = pagination?.totalPages ?? totalPages;

    if (foundSpecialist) break;
    page += 1;
  } while (page <= totalPages);

  if (!foundSpecialist) {
    return {
      ...lastRequest!,
      data: null,
      pagination: defaultPagination,
    };
  }

  const { comments, ...rest } = foundSpecialist;

  const { data, pagination } = paginateArray<SpecialistCommentRedacted>(
    comments,
    page,
    resultsPerPage,
    comments.length,
  );
  return {
    ...lastRequest!,
    data: {
      ...rest,
      comments: data,
    },
    pagination,
  };
}
