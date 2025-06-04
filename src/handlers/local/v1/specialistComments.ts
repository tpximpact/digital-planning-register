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
  DprComment,
  DprSpecialistCommentsApiResponse,
  SearchParamsComments,
} from "@/types";
import { SpecialistCommentSummary } from "@/types/odp-types/schemas/postSubmissionApplication/data/CommentSummary";
import {
  generateNResults,
  generateComment,
  generatePagination,
} from "@mocks/dprApplicationFactory";

const makeCommentSummary = (
  comments: DprComment[],
): SpecialistCommentSummary => {
  return {
    totalComments: comments.length,
    totalConsulted: Math.max(0, comments.length - 5),
    sentiment: comments.reduce(
      (acc, comment) => {
        if (comment.sentiment === "supportive") {
          acc.approved++;
        } else if (comment.sentiment === "objection") {
          acc.objected++;
        } else if (comment.sentiment === "neutral") {
          acc.amendmentsNeeded++;
        }
        return acc;
      },
      { approved: 0, objected: 0, amendmentsNeeded: 0 },
    ),
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

  const allComments = generateNResults<DprComment>(
    resultsPerPage * 10,
    generateComment,
  );
  let comments = allComments.slice(0, resultsPerPage);
  let summary = makeCommentSummary(allComments);
  let pagination = generatePagination(
    searchParams?.page ?? 1,
    allComments.length,
    allComments.length,
    resultsPerPage,
  );

  if (reference === "APP-NULL") {
    // if the reference is APP-NULL, we return no comments
    comments = [];
    summary = makeCommentSummary([]);
    pagination = generatePagination(
      searchParams?.page ?? 1,
      0,
      0,
      resultsPerPage,
    );
  }

  // if we've done a search just rename the first result to match the query
  if (searchParams?.query) {
    if (searchParams?.query === "noresultsplease") {
      comments = [];
      pagination = generatePagination(
        searchParams?.page ?? 1,
        0,
        allComments.length,
        resultsPerPage,
      );
    } else {
      comments = [generateComment()];
      comments[0].comment = searchParams?.query;
      pagination = generatePagination(
        searchParams?.page ?? 1,
        1,
        allComments.length,
        resultsPerPage,
      );
    }
  }

  return {
    data: {
      comments,
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
