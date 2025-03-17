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
import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";
import {
  generateExampleApplications,
  generatePagination,
} from "@mocks/dprApplicationFactory";

const responseQuery = (
  searchParams?: SearchParams,
): ApiResponse<DprSearchApiResponse | null> => {
  const appConfig = getAppConfig();
  const resultsPerPage = appConfig.defaults.resultsPerPage;

  const {
    consultation,
    assessmentInProgress,
    planningOfficerDetermined,
    assessmentInCommittee,
    committeeDetermined,
    appealLodged,
    appealValid,
    appealStarted,
    appealDetermined,
    withdrawn,
  } = generateExampleApplications();

  let applications = [
    consultation,
    assessmentInProgress,
    planningOfficerDetermined,
    assessmentInCommittee,
    committeeDetermined,
    appealLodged,
    appealValid,
    appealStarted,
    appealDetermined,
    withdrawn,
  ];
  let pagination = generatePagination(searchParams?.page, resultsPerPage * 5);

  // if we've done a search just rename the first result to match the query
  if (searchParams?.query) {
    applications = [consultation];
    applications[0].application.reference = searchParams.query;
    pagination = generatePagination(searchParams?.page, 1);
  }

  let data: DprSearchApiResponse | null = applications;

  if (searchParams?.query === "noresultsplease") {
    data = null;
  }

  return {
    data,
    pagination,
    status: {
      code: 200,
      message: "",
    },
  };
};

export const search = async (
  searchParams?: SearchParams,
): Promise<ApiResponse<DprSearchApiResponse | null>> => {
  return await Promise.resolve(responseQuery(searchParams));
};
