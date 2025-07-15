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
  DprPublicCommentsApiResponse,
  SearchParamsComments,
} from "@/types";
import type { PublicCommentSummary } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/CommentSummary.ts";
import {
  generateNResults,
  generateComment,
  generatePagination,
} from "@mocks/dprApplicationFactory";

const makeCommentSummary = (comments: DprComment[]): PublicCommentSummary => {
  return {
    totalComments: comments.length,
    sentiment: comments.reduce(
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
    ),
  };
};

const response = (
  council: string,
  reference: string,
  searchParams: SearchParamsComments,
): ApiResponse<DprPublicCommentsApiResponse> => {
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

export const publicComments = (
  council: string,
  reference: string,
  searchParams: SearchParamsComments,
): Promise<ApiResponse<DprPublicCommentsApiResponse | null>> => {
  return Promise.resolve(response(council, reference, searchParams));
};
