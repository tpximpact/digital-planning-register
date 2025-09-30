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
  DprSpecialistApiResponse,
  SearchParamsSpecialistComments,
} from "@/types";
import { generatePagination } from "@mocks/dprApplicationFactory";
import { generateSpecialistComment } from "@mocks/dprNewApplicationFactory";

const response = (
  council: string,
  reference: string,
  specialistId: string,
  searchParams: SearchParamsSpecialistComments,
): ApiResponse<DprSpecialistApiResponse> => {
  const appConfig = getAppConfig(council);
  const resultsPerPage = searchParams?.resultsPerPage
    ? searchParams.resultsPerPage
    : appConfig.defaults.resultsPerPage;

  const specialist = generateSpecialistComment(1, 30);
  const allComments = specialist.comments;
  let comments = allComments.slice(0, resultsPerPage);
  let data = {
    ...specialist,
    id: specialistId,
    comments,
  };
  let pagination = generatePagination(
    searchParams?.page ?? 1,
    allComments.length,
    allComments.length,
    resultsPerPage,
  );

  if (reference === "APP-NULL") {
    // if the reference is APP-NULL, we return no comments
    comments = [];
    data = {
      ...specialist,
      id: specialistId,
      comments,
    };
    pagination = generatePagination(
      searchParams?.page ?? 1,
      0,
      0,
      resultsPerPage,
    );
  }

  return {
    data,
    pagination,
    status: {
      code: 200,
      message: "Success",
    },
  };
};

export const specialist = (
  council: string,
  reference: string,
  specialistId: string,
  searchParams: SearchParamsSpecialistComments,
): Promise<ApiResponse<DprSpecialistApiResponse | null>> => {
  return Promise.resolve(
    response(council, reference, specialistId, searchParams),
  );
};
