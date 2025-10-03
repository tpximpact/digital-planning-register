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
  DprApplication,
  DprSearchApiResponse,
  SearchParamsApplication,
} from "@/types";
import { getAppConfig } from "@/config";
import {
  getApplicationDprDecisionSummary,
  getApplicationDprStatusSummary,
} from "@/lib/planningApplication";

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
  let url = `${process.env.DPR_BACKEND_URL}/api/@next/public/applications`;

  if (searchParams) {
    const params = new URLSearchParams({
      page: searchParams?.page?.toString(),
      maxresults: searchParams?.resultsPerPage?.toString() ?? "10",
    });

    if (searchParams?.query) {
      params.append("query", searchParams?.query);
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

  const config = getAppConfig(council);
  const revalidateConfig = config.defaults.revalidate;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-client": council,
      "x-service": "DPR frontend bops handler",
    },
    next: {
      revalidate: revalidateConfig,
    },
  });

  if (!response.ok) {
    return {
      data: null,
      status: {
        code: 500,
        message: "Something went wrong fetching from the backend",
      },
    };
  }
  const data = await response.json();

  const applications = data.data;

  const convertedApplications = applications.map((app: DprApplication) => {
    const applicationDecisionSummary = getApplicationDprDecisionSummary(app);
    const applicationStatusSummary = getApplicationDprStatusSummary(app);
    const application = {
      ...app,
      applicationStatusSummary,
      applicationDecisionSummary,
    } as DprApplication;
    return application;
  });

  return { ...data, data: convertedApplications };
}
