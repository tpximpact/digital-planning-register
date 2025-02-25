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

import { ApiResponse } from "@/types";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/handlers/bops/types";

/**
 * @todo this needs to be made more Dpr specific
 * @param council
 * @param applicationId
 * @returns
 */
const responseQuery = (
  council: string,
  applicationId: number,
  error: boolean,
): ApiResponse<BopsV1PlanningApplicationsNeighbourResponse> => {
  if (error) {
    return {
      data: null,
      status: {
        code: 400,
        message: "Bad Request",
        detail:
          "Validation failed: Name can't be blank, Response can't be blank, Summary tag can't be blank",
      },
    };
  } else {
    return {
      data: {
        id: applicationId.toString(),
        message: "Response submitted",
      },
      status: {
        code: 200,
        message: "",
      },
    };
  }
};

export const postComment = (
  council: string,
  applicationId: number,
  // apiData: object,
): Promise<ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>> => {
  // console.log("apiData", apiData);
  const error = false;
  // uncomment for testing
  // error = true;
  return Promise.resolve(responseQuery(council, applicationId, error));
};
