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
  DprDocumentsApiResponse,
  SearchParamsDocuments,
} from "@/types";
import { BopsV2PublicPlanningApplicationDocuments } from "@/handlers/bops/types";
import { convertBopsDocumentEndpointToDprDocumentEndpoint } from "@/handlers/bops/converters/documents";
import { handleBopsGetRequest } from "../requests";

export async function documents(
  council: string,
  reference: string,
  searchParams: SearchParamsDocuments,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> {
  let url = `public/planning_applications/${reference}/documents`;

  if (searchParams) {
    const params = new URLSearchParams({
      page: searchParams?.page?.toString(),
      resultsPerPage: searchParams?.resultsPerPage?.toString() ?? "10",
    });

    if (searchParams.name) {
      params.append("name", searchParams.name);
    }
    if (searchParams.sortBy) {
      params.append("sortBy", searchParams.sortBy);
    }
    if (searchParams.orderBy) {
      params.append("orderBy", searchParams.orderBy);
    }
    if (searchParams.type) {
      params.append("type", searchParams.type);
    }
    if (searchParams.publishedAtFrom && searchParams.publishedAtTo) {
      params.append("publishedAtFrom", searchParams.publishedAtFrom);
      params.append("publishedAtTo", searchParams.publishedAtTo);
    }
    url = `${url}?${params.toString()}`;
  }

  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationDocuments | null>
  >(council, url);

  const { status } = request;
  const bopsDocuments = request.data?.files || [];
  const bopsPagination = request.data?.metadata || { totalResults: 0 };
  const totalResults = bopsPagination.totalResults;


  const documents = convertBopsDocumentEndpointToDprDocumentEndpoint(
    bopsDocuments,
    totalResults,
    searchParams,
    status,
  );

  return documents;
}
