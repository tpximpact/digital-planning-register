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
  apiData: object,
): Promise<ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>> => {
  // console.log("apiData", apiData);
  let error = false;
  // uncomment for testing
  // error = true;
  return Promise.resolve(responseQuery(council, applicationId, error));
};
