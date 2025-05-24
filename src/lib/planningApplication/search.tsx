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

import { AppConfig } from "@/config/types";
import { getValueFromUnknownSearchParams } from "@/lib/search";
import {
  DprApplicationDateRange,
  DprApplicationDateType,
  DprApplicationOrderBy,
  DprApplicationSortBy,
  DprDecisionSummary,
  DprQuickSearchFilter,
  DprStatusSummary,
  SearchParamsApplication,
  UnknownSearchParams,
} from "@/types";
import { validApplicationTypes } from "./type";
import { ApplicationType } from "@/types/odp-types/schemas/prototypeApplication/enums/ApplicationType";
import { validPublicApplicationStatusSummaries } from "./status";
import { validDprDecisionSummaries } from "./decision";

// resultsPerPage
export const APPLICATION_RESULTSPERPAGE_OPTIONS = [10, 25, 50];
export const APPLICATION_RESULTSPERPAGE_DEFAULT =
  APPLICATION_RESULTSPERPAGE_OPTIONS[0];

// sortBy
export const APPLICATION_SORTBY_OPTIONS: DprApplicationSortBy[] = [
  "receivedAt",
  "councilDecisionDate",
];
export const APPLICATION_SORTBY_DEFAULT = APPLICATION_SORTBY_OPTIONS[0];

// orderBy
export const APPLICATION_ORDERBY_OPTIONS = ["desc", "asc"];
export const APPLICATION_ORDERBY_DEFAULT = APPLICATION_ORDERBY_OPTIONS[0];

// dprFilter
export const APPLICATION_DPR_FILTER_OPTIONS: DprQuickSearchFilter[] = [
  "inConsultation",
  "publishedThisWeek",
  "publishedThisMonth",
  "decidedThisWeek",
  "decidedThisMonth",
];

// dateType
export const APPLICATION_DATETYPE_OPTIONS: Array<{
  label: string;
  value: DprApplicationDateType;
}> = [
  { label: "Received", value: "receivedAt" },
  { label: "Valid from", value: "validatedAt" },
  { label: "Published", value: "publishedAt" },
  { label: "Consultation ended", value: "consultationEndDate" },
  { label: "Council decision", value: "councilDecisionDate" },
  { label: "Appeal decision", value: "appealDecisionDate" },
];

// dateRange
export const APPLICATION_DATERANGE_OPTIONS: Array<{
  label: string;
  value: DprApplicationDateRange;
}> = [
  { label: "In the last week", value: "week" },
  { label: "In the last month", value: "month" },
  { label: "In the last quarter", value: "quarter" },
  { label: "In the last year", value: "year" },
  { label: "A fixed date range", value: "fixed" },
];

/**
 * This function checks if a search has been performed based on the provided
 * search parameters. It returns true if any of the search parameters (except
 * for "page" "resultsPerPage" or "type") are defined and not null or empty.
 *
 * @param validSearchParams - The search parameters to check.
 * @returns {boolean} - True if a search has been performed, false otherwise.
 */
export const checkSearchPerformed = (
  validSearchParams: SearchParamsApplication,
) => {
  const searchPerformed =
    validSearchParams &&
    (
      Object.entries(validSearchParams) as [
        keyof SearchParamsApplication,
        unknown,
      ][]
    ).some(
      ([key, value]) =>
        !["page", "resultsPerPage", "type"].includes(key as string) &&
        value !== undefined &&
        value !== null &&
        value !== "",
    );
  return searchPerformed;
};

export const validateSearchParams = (
  appConfig: AppConfig,
  searchParams?: UnknownSearchParams,
): SearchParamsApplication => {
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
        APPLICATION_RESULTSPERPAGE_OPTIONS.includes(parsedResultsPerPage)
      ) {
        return parsedResultsPerPage;
      }
    }

    return appConfig.defaults.resultsPerPage;
  })();

  // type
  const type = (() => {
    const typeValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "type")
      : undefined;
    // Only allow "simple" or "full", default to "simple"
    return typeValue === "simple" || typeValue === "full"
      ? typeValue
      : "simple";
  })();

  // sortBy
  const sortBy: DprApplicationSortBy | undefined = (() => {
    const sortByValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "sortBy")
      : undefined;

    if (
      sortByValue &&
      APPLICATION_SORTBY_OPTIONS.includes(sortByValue as DprApplicationSortBy)
    ) {
      return sortByValue as DprApplicationSortBy;
    }

    return undefined;
  })();

  // orderBy
  const orderBy: DprApplicationOrderBy | undefined = (() => {
    const orderByValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "orderBy")
      : undefined;

    if (
      orderByValue &&
      APPLICATION_ORDERBY_OPTIONS.includes(
        orderByValue as DprApplicationOrderBy,
      )
    ) {
      return orderByValue as DprApplicationOrderBy;
    }

    return undefined;
  })();

  // Ensure query is a string
  const query: string | undefined = searchParams
    ? getValueFromUnknownSearchParams(searchParams, "query")
    : undefined;

  // Ensure reference is a string
  const reference: string | undefined = searchParams
    ? getValueFromUnknownSearchParams(searchParams, "reference")
    : undefined;

  // Ensure description is a string
  const description: string | undefined = searchParams
    ? getValueFromUnknownSearchParams(searchParams, "description")
    : undefined;

  // applicationType
  const applicationType: string | undefined = (() => {
    const applicationTypeValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "applicationType")
      : undefined;

    if (!applicationTypeValue) return undefined;

    // Flatten all valid application types
    const flatApplicationTypes = Object.values(validApplicationTypes).flat();

    // Split, dedupe, and filter only valid types
    const selectedTypes = Array.from(
      new Set(applicationTypeValue.split(",").map((v) => v.trim())),
    ).filter((v): v is ApplicationType =>
      flatApplicationTypes.includes(v as ApplicationType),
    );

    return selectedTypes.length > 0 ? selectedTypes.join(",") : undefined;
  })();

  // applicationStatus
  const applicationStatus: string | undefined = (() => {
    const applicationStatusValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "applicationStatus")
      : undefined;

    if (!applicationStatusValue) return undefined;

    // Split, dedupe, and filter only valid types
    const selectedStatus = Array.from(
      new Set(applicationStatusValue.split(",").map((v) => v.trim())),
    ).filter((v): v is DprStatusSummary =>
      validPublicApplicationStatusSummaries.includes(v as DprStatusSummary),
    );

    return selectedStatus.length > 0 ? selectedStatus.join(",") : undefined;
  })();

  // councilDecision
  const councilDecision: string | undefined = (() => {
    const councilDecisionValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "councilDecision")
      : undefined;

    if (!councilDecisionValue) return undefined;

    // Split, dedupe, and filter only valid types
    const selectedDecisionSummaries = Array.from(
      new Set(councilDecisionValue.split(",").map((v) => v.trim())),
    ).filter((v): v is DprDecisionSummary =>
      validDprDecisionSummaries.includes(v as DprDecisionSummary),
    );

    return selectedDecisionSummaries.length > 0
      ? selectedDecisionSummaries.join(",")
      : undefined;
  })();

  // dateType
  const dateType: DprApplicationDateType | undefined = (() => {
    const dateTypeValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "dateType")
      : undefined;

    const validDateTypeValues = APPLICATION_DATETYPE_OPTIONS.map(
      (option) => option.value,
    );

    if (
      dateTypeValue &&
      validDateTypeValues.includes(dateTypeValue as DprApplicationDateType)
    ) {
      return dateTypeValue as DprApplicationDateType;
    }

    return undefined;
  })();

  // dateRange
  const dateRange: DprApplicationDateRange | undefined = (() => {
    const dateRangeValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "dateRange")
      : undefined;

    const validDateRangeValues = APPLICATION_DATERANGE_OPTIONS.map(
      (option) => option.value,
    );

    if (
      dateRangeValue &&
      validDateRangeValues.includes(dateRangeValue as DprApplicationDateRange)
    ) {
      return dateRangeValue as DprApplicationDateRange;
    }

    return undefined;
  })();

  // dprFilter
  // @TODO this can only be set if the other values are valid for this filter
  const dprFilter: DprQuickSearchFilter | undefined = (() => {
    const dprFilterValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "dprFilter")
      : undefined;

    if (
      dprFilterValue &&
      APPLICATION_DPR_FILTER_OPTIONS.includes(
        dprFilterValue as DprQuickSearchFilter,
      )
    ) {
      return dprFilterValue as DprQuickSearchFilter;
    }

    return undefined;
  })();

  const newSearchParams: SearchParamsApplication = {
    page: validPage,
    resultsPerPage,
    type,
    ...(query && { query }),
    ...(sortBy && { sortBy }),
    ...(orderBy && { orderBy }),
    ...(dprFilter && { dprFilter }),
    ...(reference && { reference }),
    ...(description && { description }),
    ...(applicationType && { applicationType }),
    ...(applicationStatus && { applicationStatus }),
    ...(councilDecision && { councilDecision }),
    ...(dateType && { dateType }),
    ...(dateRange && { dateRange }),
  };

  return newSearchParams;
};
