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

import {
  ApiResponse,
  DprPagination,
  DprApplication,
  DprPlanningApplication,
  DprSearchApiResponse,
  SearchParamsApplication,
} from "@/types";
import { BopsV2PublicPlanningApplicationsSearch } from "@/handlers/bops/types";
import { handleBopsGetRequest } from "@/handlers/bops/requests";
import { defaultPagination } from "@/handlers/lib";
import {
  convertBopsToDpr,
  convertBopsToDprPagination,
} from "@/handlers/bops/converters/planningApplication";
import {
  convertToDprApplication,
  isDprApplication,
} from "@/lib/planningApplication/converter";

/**
 * Get list of public applications, also used for search
 * https://camden.bops-staging.services/api/v2/public/planning_applications/search?page=3&maxresults=8
 * @param page
 * @param resultsPerPage
 * @param council
 * @param search
 * @returns
 */
export async function search(
  council: string,
  searchParams?: SearchParamsApplication,
): Promise<ApiResponse<DprSearchApiResponse | null>> {
  let url = `public/planning_applications/search`;

  if (searchParams) {
    const params = new URLSearchParams({
      page: searchParams?.page?.toString(),
      maxresults: searchParams?.resultsPerPage?.toString() ?? "10",
    });

    if (searchParams?.query) {
      params.append("q", searchParams?.query);
    }
    if (searchParams.sortBy) {
      params.append("sortBy", searchParams.sortBy);
    }
    if (searchParams.orderBy) {
      params.append("orderBy", searchParams.orderBy);
    }
    if (searchParams.dprFilter) {
      params.append("dprFilter", searchParams.dprFilter);
    }
    if (searchParams.reference) {
      params.append("reference", searchParams.reference);
    }
    if (searchParams.description) {
      params.append("description", searchParams.description);
    }
    if (searchParams.applicationType) {
      params.append("applicationType", searchParams.applicationType);
    }
    if (searchParams.applicationStatus) {
      params.append("applicationStatus", searchParams.applicationStatus);
    }
    if (searchParams.councilDecision) {
      params.append("councilDecision", searchParams.councilDecision);
    }

    if (searchParams.dateType && searchParams.dateRange) {
      const { dateType, dateRange, dateRangeFrom, dateRangeTo } = searchParams;
      const formatDate = (date: Date) => date.toISOString().slice(0, 10);
      const today = new Date();

      let from: string | undefined;
      let to: string | undefined = formatDate(today);

      switch (dateRange) {
        case "fixed":
          if (dateRangeFrom && dateRangeTo) {
            from = dateRangeFrom;
            to = dateRangeTo;
          }
          break;
        case "week": {
          const d = new Date(today);
          d.setDate(today.getDate() - 7);
          from = formatDate(d);
          break;
        }
        case "month": {
          const d = new Date(today);
          d.setMonth(today.getMonth() - 1);
          from = formatDate(d);
          break;
        }
        case "quarter": {
          const d = new Date(today);
          d.setMonth(today.getMonth() - 3);
          from = formatDate(d);
          break;
        }
        case "year": {
          const d = new Date(today);
          d.setFullYear(today.getFullYear() - 1);
          from = formatDate(d);
          break;
        }
      }

      if (from && to) {
        params.append(`${dateType}From`, from);
        params.append(`${dateType}To`, to);
      }
    }

    url = `${url}?${params.toString()}`;
  }

  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationsSearch | null>
  >(council, url);

  const { data: planningApplications = [] } = request.data || {};

  const convertedApplications = planningApplications.map((application) =>
    convertBopsToDpr(application, council),
  );

  const errors: {
    app: DprPlanningApplication;
    reference: string;
    error: unknown;
  }[] = [];

  const dprApplications: DprApplication[] = convertedApplications
    .map((application) => {
      try {
        return isDprApplication(application)
          ? application
          : convertToDprApplication(application);
      } catch (error) {
        console.error("Error converting application:", error);
        errors.push({
          app: application,
          reference: application.application.reference,
          error,
        });
        return null;
      }
    })
    .filter((app): app is DprApplication => app !== null);

  if (errors.length > 0) {
    console.warn("Some applications failed to convert:", errors);
  }
  const metadata = request.data?.metadata;
  const pagination: DprPagination =
    metadata && "results" in metadata
      ? convertBopsToDprPagination(metadata)
      : defaultPagination;

  return {
    ...request,
    data: dprApplications.length > 0 ? dprApplications : null,
    pagination,
  };
}
