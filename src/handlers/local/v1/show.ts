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

import { ApiResponse, DprShowApiResponse } from "@/types";

import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";

const response = (reference: string): ApiResponse<DprShowApiResponse> => {
  let application = null;

  const exampleApplications = generateExampleApplications();

  // it can never be ldc or determined because comments are disabled there!
  if (reference === "TEST-C0MNT-F10W") {
    application = exampleApplications.consultation;
  } else {
    const keys = Object.keys(exampleApplications);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    application = exampleApplications[randomKey];
  }

  application.data.application.reference = reference;

  return {
    data: application,
    status: {
      code: 200,
      message: "",
    },
  };
};

export const show = (
  council: string,
  reference: string,
): Promise<ApiResponse<DprShowApiResponse | null>> => {
  return Promise.resolve(response(reference));
};
