"use server";

import { ApiResponse } from "@/types";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/handlers/bops/types";

// const responseFail: ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null> =
//   {
//     data: null,
//     status: {
//       code: 400,
//       message: "Bad Request",
//       detail: {
//         message:
//           "Validation failed: Name can't be blank, Response can't be blank, Summary tag can't be blank",
//       },
//     },
//   };

const response: ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null> =
  {
    data: {
      id: "24-00136-HAPP",
      message: "Response submitted",
    },
    status: {
      code: 200,
      message: "OK",
    },
  };

export const postComment = (): Promise<
  ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>
> => {
  return Promise.resolve(response);
};
