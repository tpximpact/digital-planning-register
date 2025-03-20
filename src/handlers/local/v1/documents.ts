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
  searchParams?: SearchParamsDocuments,
): ApiResponse<DprDocumentsApiResponse> => {
  const appConfig = getAppConfig();
  const resultsPerPage = searchParams?.resultsPerPage
    ? searchParams.resultsPerPage
    : appConfig.defaults.resultsPerPage;

  let documents = [
    ...generateNResults<DprDocument>(resultsPerPage * 10, generateDocument),
  ];
  if (searchParams?.page === 1) {
    documents = [
      {
        url: `/${council}/${reference}/application-form`,
        title: "Application form",
        metadata: {
          contentType: "text/html",
        },
      },
      ...generateNResults<DprDocument>(
        resultsPerPage * 10 - 1,
        generateDocument,
      ),
    ];
  }

  // if we've done a search just rename the first result to match the query
  if (searchParams?.query) {
    documents[0].title = searchParams?.query;
  }

  return {
    data: documents,
    pagination: generatePagination(searchParams?.page ?? 1),
    status: {
      code: 200,
      message: "",
    },
  };
};

export const documents = (
  council: string,
  reference: string,
  searchParams?: SearchParamsDocuments,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> => {
  return Promise.resolve(responseQuery(council, reference, searchParams));
};
