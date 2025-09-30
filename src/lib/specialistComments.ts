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

/**
 * Helpers related to comments
 */

import {
  DprSpecialistCommentsOrderBy,
  DprSpecialistCommentsSortBy,
  SearchParamsSpecialistComments,
  UnknownSearchParams,
} from "@/types";
import { AppConfig } from "@/config/types";

import type { SpecialistCommentSentiment } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/CommentSentiment.ts";
import { getValueFromUnknownSearchParams } from "./search";

// resultsPerPage
export const SPECIALIST_COMMENTS_RESULTSPERPAGE_OPTIONS = [10, 25, 50];
export const SPECIALIST_COMMENTS_RESULTSPERPAGE_DEFAULT =
  SPECIALIST_COMMENTS_RESULTSPERPAGE_OPTIONS[0];

// sortBy
export const SPECIALIST_COMMENTS_SORTBY_OPTIONS: DprSpecialistCommentsSortBy[] =
  ["publishedAt"];
export const SPECIALIST_COMMENTS_SORTBY_DEFAULT =
  SPECIALIST_COMMENTS_SORTBY_OPTIONS[0];

// order by
export const SPECIALIST_COMMENTS_ORDERBY_OPTIONS = ["desc", "asc"];
export const SPECIALIST_COMMENTS_ORDERBY_DEFAULT =
  SPECIALIST_COMMENTS_ORDERBY_OPTIONS[0];

// sentiment - specialist
// @todo use SpecialistCommentSentiment not string for value when we have updated the schema
export const COMMENT_SPECIALIST_SENTIMENT_OPTIONS: Array<{
  label: string;
  value: SpecialistCommentSentiment | string;
}> = [
  {
    label: "Approved",
    value: "approved",
  },
  {
    label: "Amendments needed",
    value: "amendmentsNeeded",
  },
  {
    label: "Objected",
    value: "objected",
  },
];

export const validateSearchParams = (
  appConfig: AppConfig,
  searchParams?: UnknownSearchParams,
): SearchParamsSpecialistComments => {
  // page
  const validPage = (() => {
    // get the value if it exists
    const pageValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "page")
      : undefined;
    // parse it
    const pageNumber = parseInt(pageValue || "1", 10);
    // if its not a number or less than or equal to 0, return 1
    // otherwise return the number
    return isNaN(pageNumber) || pageNumber <= 0 ? 1 : pageNumber;
  })();

  // resultsPerPage
  const resultsPerPage = (() => {
    if (searchParams?.resultsPerPage) {
      const workingResultsPerPage = getValueFromUnknownSearchParams(
        searchParams,
        "resultsPerPage",
      );
      const parsedResultsPerPage = parseInt(workingResultsPerPage || "", 10);
      if (
        !isNaN(parsedResultsPerPage) &&
        SPECIALIST_COMMENTS_RESULTSPERPAGE_OPTIONS.includes(
          parsedResultsPerPage,
        )
      ) {
        return parsedResultsPerPage;
      }
    }

    return appConfig.defaults.resultsPerPage;
  })();

  // sortBy
  const sortBy: DprSpecialistCommentsSortBy | undefined = (() => {
    const sortByValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "sortBy")
      : undefined;

    if (
      sortByValue &&
      SPECIALIST_COMMENTS_SORTBY_OPTIONS.includes(
        sortByValue as DprSpecialistCommentsSortBy,
      )
    ) {
      return sortByValue as DprSpecialistCommentsSortBy;
    }

    return undefined;
  })();

  // orderBy
  const orderBy: DprSpecialistCommentsOrderBy | undefined = (() => {
    const orderByValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "orderBy")
      : undefined;

    if (
      orderByValue &&
      SPECIALIST_COMMENTS_ORDERBY_OPTIONS.includes(
        orderByValue as DprSpecialistCommentsOrderBy,
      )
    ) {
      return orderByValue as DprSpecialistCommentsOrderBy;
    }

    return undefined;
  })();

  const newSearchParams: SearchParamsSpecialistComments = {
    page: validPage,
    resultsPerPage,
    ...(sortBy && { sortBy }),
    ...(orderBy && { orderBy }),
  };

  return newSearchParams;
};
