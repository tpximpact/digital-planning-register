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

import type {
  ApiResponse,
  DprApplicationSubmissionApiResponse,
  DprSearchApiResponse,
  DprShowApiResponse,
  SearchParamsApplication,
  SearchParamsComments,
  SearchParamsDocuments,
  SearchParamsSpecialistComments,
} from "@/types";
import type { ApiHandler } from "../types";
import { backendRequest } from "../lib/request";
import { buildQuery, resolveDateRange, type QuerySpec } from "../lib/query";

/**
 * Optional behaviour layered over the generic backend handler. A source only
 * provides the hooks it needs, everything else behaves the same for all sources.
 */
export interface ExternalExtras {
  /** Post-process a search response, e.g. to add derived fields */
  afterSearch?: (
    response: ApiResponse<DprSearchApiResponse | null>,
  ) => ApiResponse<DprSearchApiResponse | null>;

  /** Post-process a show response, may call other services */
  afterShow?: (
    council: string,
    reference: string,
    response: ApiResponse<DprShowApiResponse | null>,
  ) => Promise<ApiResponse<DprShowApiResponse | null>>;

  /** Replace the default POST to the backend */
  postComment?: ApiHandler["postComment"];
}

/* -------------------------------------------------------------------------- */
/*  Which params go on the query string, per endpoint                         */
/* -------------------------------------------------------------------------- */

const paging = { page: 1, resultsPerPage: 10 } as const;

const searchQuery: QuerySpec<SearchParamsApplication> = {
  keys: [
    "page",
    "resultsPerPage",
    "query",
    "sortBy",
    "orderBy",
    "dprFilter",
    "reference",
    "description",
    "applicationType",
    "applicationStatus",
    "councilDecision",
  ],
  // the applications endpoint calls the page size `maxresults`
  rename: { resultsPerPage: "maxresults" },
  defaults: paging,
};

const documentsQuery: QuerySpec<SearchParamsDocuments> = {
  keys: ["page", "resultsPerPage", "name", "sortBy", "orderBy", "type"],
  pairs: [["publishedAtFrom", "publishedAtTo"]],
  defaults: paging,
};

const publicCommentsQuery: QuerySpec<SearchParamsComments> = {
  keys: [
    "page",
    "resultsPerPage",
    "query",
    "sortBy",
    "orderBy",
    "sentiment",
    "topic",
  ],
  pairs: [["publishedAtFrom", "publishedAtTo"]],
  defaults: paging,
};

const specialistCommentsQuery: QuerySpec<SearchParamsComments> = {
  keys: ["page", "resultsPerPage", "query", "sortBy", "orderBy", "sentiment"],
  pairs: [["publishedAtFrom", "publishedAtTo"]],
  defaults: paging,
};

const specialistQuery: QuerySpec<SearchParamsSpecialistComments> = {
  keys: ["page", "resultsPerPage", "query", "sortBy", "orderBy"],
  defaults: paging,
};

/* -------------------------------------------------------------------------- */
/*  Handler                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Creates a handler that reads from the DPR backend API.
 * @param name sent as the x-handler header, e.g. "bops" or "external"
 * @param extras optional source specific behaviour
 */
export const createExternalHandler = (
  name: string,
  extras: ExternalExtras = {},
): ApiHandler => {
  const get = <T>(council: string, path: string) =>
    backendRequest<T>({ council, handler: name, path });

  return {
    async search(council, searchParams) {
      const query = buildQuery(
        searchParams,
        searchQuery,
        resolveDateRange(searchParams),
      );
      const response = await get<DprSearchApiResponse>(
        council,
        `/applications${query}`,
      );
      return extras.afterSearch ? extras.afterSearch(response) : response;
    },

    async show(council, reference) {
      const response = await get<DprShowApiResponse>(
        council,
        `/applications/${reference}`,
      );
      return extras.afterShow
        ? extras.afterShow(council, reference, response)
        : response;
    },

    async applicationSubmission(council, reference) {
      // the submission is part of the application, there is no endpoint of its own
      const { data, ...rest } = await get<{
        submission?: DprApplicationSubmissionApiResponse;
      }>(council, `/applications/${reference}`);
      return { ...rest, data: data?.submission ?? null };
    },

    documents: (council, reference, searchParams) =>
      get(
        council,
        `/applications/${reference}/documents${buildQuery(searchParams, documentsQuery)}`,
      ),

    publicComments: (council, reference, searchParams) =>
      get(
        council,
        `/applications/${reference}/publicComments${buildQuery(searchParams, publicCommentsQuery)}`,
      ),

    specialistComments: (council, reference, searchParams) =>
      get(
        council,
        `/applications/${reference}/specialistComments${buildQuery(searchParams, specialistCommentsQuery)}`,
      ),

    specialist: (council, reference, specialistId, searchParams) =>
      get(
        council,
        `/applications/${reference}/specialistComments/${specialistId}${buildQuery(searchParams, specialistQuery)}`,
      ),

    postComment:
      extras.postComment ??
      ((council, reference, apiData) =>
        backendRequest({
          council,
          handler: name,
          method: "POST",
          path: `/applications/${reference}/publicComments`,
          body: apiData,
        })),
  };
};
