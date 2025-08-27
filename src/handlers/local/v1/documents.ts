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

import { getAppConfig } from "@/config";
import {
  ApiResponse,
  DprDocument,
  DprDocumentsApiResponse,
  SearchParamsDocuments,
} from "@/types";
import {
  generateDocument,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";

const responseQuery = (
  council: string,
  reference: string,
  searchParams: SearchParamsDocuments,
): ApiResponse<DprDocumentsApiResponse> => {
  const appConfig = getAppConfig();
  const resultsPerPage = searchParams?.resultsPerPage
    ? searchParams.resultsPerPage
    : appConfig.defaults.resultsPerPage;

  let documents: DprDocument[] | null = generateNResults<DprDocument>(
    resultsPerPage,
    generateDocument,
  );
  let pagination = generatePagination(
    searchParams?.page ?? 1,
    resultsPerPage * 5,
  );

  if (reference === "APP-NULL") {
    // if the reference is APP-NULL, we return no documents
    documents = null;
    pagination = generatePagination(searchParams?.page ?? 1, 0, 0);
  }

  // if we've done a search just rename the first result to match the query
  if (searchParams?.name) {
    if (searchParams?.name === "noresultsplease") {
      documents = null;
      pagination = generatePagination(
        searchParams?.page ?? 1,
        0,
        resultsPerPage * 5,
      );
    } else {
      documents = [generateDocument()];
      documents[0].name = searchParams?.name;
      pagination = generatePagination(
        searchParams?.page ?? 1,
        1,
        resultsPerPage * 5,
      );
    }
  }

  return {
    data: documents,
    pagination,
    status: {
      code: 200,
      message: "",
    },
  };
};

export const documents = (
  council: string,
  reference: string,
  searchParams: SearchParamsDocuments,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> => {
  return Promise.resolve(responseQuery(council, reference, searchParams));
};
