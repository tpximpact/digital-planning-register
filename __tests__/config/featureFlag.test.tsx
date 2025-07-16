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

import { computeEnabledFields } from "@/config/featureFlag";
import {
  handleFeatureFlags,
  COMMENT_SEARCH_FIELDS,
  DOCUMENT_SEARCH_FIELDS,
  APPLICATION_SEARCH_FIELDS,
} from "@/config/featureFlag";

describe("handleFeatureFlags", () => {
  it("returns all fields if envVar is undefined", () => {
    const result = handleFeatureFlags(
      "Comment",
      COMMENT_SEARCH_FIELDS,
      undefined,
    );
    expect(result).toEqual([...COMMENT_SEARCH_FIELDS]);
  });

  it("returns all fields if envVar is empty string", () => {
    const result = handleFeatureFlags("Document", DOCUMENT_SEARCH_FIELDS, "");
    expect(result).toEqual([...DOCUMENT_SEARCH_FIELDS]);
  });

  it("removes disabled fields listed in envVar", () => {
    const envVar = "sentiment,sentimentSpecialist";
    const result = handleFeatureFlags("Comment", COMMENT_SEARCH_FIELDS, envVar);
    expect(result).toEqual([
      "query",
      "resultsPerPage",
      "page",
      "publishedAtFrom",
      "publishedAtTo",
      "topic",
    ]);
  });

  it("ignores extra spaces and empty values in envVar", () => {
    const envVar = "sentiment, ,sentimentSpecialist,";
    const result = handleFeatureFlags("Comment", COMMENT_SEARCH_FIELDS, envVar);
    expect(result).toEqual([
      "query",
      "resultsPerPage",
      "page",
      "publishedAtFrom",
      "publishedAtTo",
      "topic",
    ]);
  });

  it("returns only enabled fields for Application", () => {
    const envVar = "advancedSearch,quickFilters,applicationType";
    const result = handleFeatureFlags(
      "Application",
      APPLICATION_SEARCH_FIELDS,
      envVar,
    );
    expect(result).toEqual([
      "sortBy",
      "query",
      "reference",
      "description",
      "applicationStatus",
      "councilDecision",
      "dateType",
      "dateRange",
      "dateRangeFrom",
      "dateRangeTo",
    ]);
  });

  it("returns empty array if all fields are disabled", () => {
    const envVar = [...DOCUMENT_SEARCH_FIELDS].join(",");
    const result = handleFeatureFlags(
      "Document",
      DOCUMENT_SEARCH_FIELDS,
      envVar,
    );
    expect(result).toEqual([]);
  });
});

describe("computeEnabledFields", () => {
  it("returns all fields when envVar is undefined", () => {
    const all = ["sentiment", "publishedAtTo", "publishedAtFrom"];
    expect(computeEnabledFields(all, undefined)).toEqual(all);
  });

  it("filters out fields listed in envVar", () => {
    const all = ["sentiment", "publishedAtTo", "publishedAtFrom"];
    const envVar = "publishedAtTo,publishedAtFrom";
    expect(computeEnabledFields(all, envVar)).toEqual(["sentiment"]);
  });

  it("returns empty array when all fields disabled", () => {
    const all = ["sentiment", "publishedAtTo", "publishedAtFrom", "query"];
    const envVar = "sentiment,publishedAtTo,publishedAtFrom,query";
    expect(computeEnabledFields(all, envVar)).toEqual([]);
  });
});
