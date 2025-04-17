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
  DprPublicCommentsApiResponse,
  SearchParamsComments,
} from "@/types";
import {
  generateNResults,
  generateComment,
} from "@mocks/dprApplicationFactory";

const response = (
  council: string,
  reference: string,
  searchParams: SearchParamsComments,
): ApiResponse<DprPublicCommentsApiResponse> => {
  const exampleComments = generateNResults(20, () => generateComment());
  const sentimentSummary = exampleComments.reduce(
    (acc, comment) => {
      if (comment.sentiment === "supportive") {
        acc.supportive++;
      } else if (comment.sentiment === "objection") {
        acc.objection++;
      } else if (comment.sentiment === "neutral") {
        acc.neutral++;
      }
      return acc;
    },
    { supportive: 0, objection: 0, neutral: 0 },
  );
  const appConfig = getAppConfig(council);
  const resultsPerPage = appConfig?.defaults?.resultsPerPage || 10;
  const currentPage = searchParams?.page || 1;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedComments = exampleComments.slice(
    startIndex,
    startIndex + resultsPerPage,
  );
  const totalPages = Math.ceil(exampleComments.length / resultsPerPage);

  return {
    data: {
      comments: paginatedComments,
      summary: {
        totalComments: exampleComments.length,
        sentiment: sentimentSummary,
      },
    },
    status: {
      code: 200,
      message: "Success",
    },
    pagination: {
      resultsPerPage: resultsPerPage,
      currentPage: currentPage,
      totalPages: totalPages,
      totalItems: exampleComments.length,
    },
  };
};

export const publicComments = (
  council: string,
  reference: string,
  searchParams: SearchParamsComments,
): Promise<ApiResponse<DprPublicCommentsApiResponse | null>> => {
  return Promise.resolve(response(council, reference, searchParams));
};
