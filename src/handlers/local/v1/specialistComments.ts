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
  DprSpecialistCommentsApiResponse,
  SearchParamsComments,
} from "@/types";
import type { SpecialistCommentSummary } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/CommentSummary.ts";
import {
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { generateSpecialistComment } from "@mocks/dprNewApplicationFactory";
import { SpecialistRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";

export const makeCommentSummary = (
  specialists: SpecialistRedacted[],
): SpecialistCommentSummary => {
  // Count all comments for totalComments
  const totalComments = specialists
    .map((specialist) => specialist.comments.length)
    .reduce((a, b) => a + b, 0);

  // Only count the latest comment's sentiment for each specialist
  const sentiment = specialists.reduce(
    (acc, specialist) => {
      const latest = specialist.comments[0];
      if (latest) {
        if (latest.sentiment === "approved") {
          acc.approved++;
        } else if (latest.sentiment === "objected") {
          acc.objected++;
        } else if (latest.sentiment === "amendmentsNeeded") {
          acc.amendmentsNeeded++;
        }
      }
      return acc;
    },
    { approved: 0, objected: 0, amendmentsNeeded: 0 },
  );

  return {
    totalComments,
    totalConsulted: specialists.length,
    sentiment,
  };
};

const response = (
  council: string,
  reference: string,
  searchParams: SearchParamsComments,
): ApiResponse<DprSpecialistCommentsApiResponse> => {
  const appConfig = getAppConfig(council);
  const resultsPerPage = searchParams?.resultsPerPage
    ? searchParams.resultsPerPage
    : appConfig.defaults.resultsPerPage;

  const allSpecialists = generateNResults<SpecialistRedacted>(
    resultsPerPage * 10,
    () => generateSpecialistComment(1, 2),
  );
  let specialists = allSpecialists.slice(0, resultsPerPage);
  let summary: SpecialistCommentSummary = makeCommentSummary(allSpecialists);
  let pagination = generatePagination(
    searchParams?.page ?? 1,
    specialists.length,
    allSpecialists.length,
    resultsPerPage,
  );

  if (reference === "APP-NULL") {
    // if the reference is APP-NULL, we return no comments
    specialists = [];
    summary = makeCommentSummary([]);
    pagination = generatePagination(
      searchParams?.page ?? 1,
      0,
      0,
      resultsPerPage,
    );
  }

  if (searchParams?.query === "noresultsplease") {
    // if the query is noresultsplease, we return no specialists
    specialists = [];
    summary = makeCommentSummary([]);
    pagination = generatePagination(
      searchParams?.page ?? 1,
      0,
      allSpecialists.length,
      resultsPerPage,
    );
  }

  return {
    data: {
      comments: specialists,
      summary,
    },
    pagination,
    status: {
      code: 200,
      message: "Success",
    },
  };
};

export const specialistComments = (
  council: string,
  reference: string,
  searchParams: SearchParamsComments,
): Promise<ApiResponse<DprSpecialistCommentsApiResponse | null>> => {
  return Promise.resolve(response(council, reference, searchParams));
};
