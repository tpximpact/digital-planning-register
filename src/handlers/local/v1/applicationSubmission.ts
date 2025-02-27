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

import { ApiResponse, DprApplicationSubmissionApiResponse } from "@/types";
import { generateDprApplication } from "@mocks/dprApplicationFactory";
import { generateApplicationSubmission } from "@mocks/dprApplicationSubmission";

/**
 * @todo submission should be generateApplicationSubmission
 */
const responseQuery = (
  council: string,
  reference: string,
): ApiResponse<DprApplicationSubmissionApiResponse> => {
  const applicationApplication = generateDprApplication().application;
  applicationApplication.reference = reference;
  return {
    data: {
      application: applicationApplication,
      submission: generateApplicationSubmission,
    },
    status: {
      code: 200,
      message: "",
    },
  };
};

export const applicationSubmission = (
  council: string,
  reference: string,
): Promise<ApiResponse<DprApplicationSubmissionApiResponse | null>> => {
  return Promise.resolve(responseQuery(council, reference));
};
