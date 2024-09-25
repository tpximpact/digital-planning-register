import { ApiResponse } from "@/types";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/types/api/bops";

const localApiResponse: ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null> =
  {
    data: {
      application: { reference: "comment success stuff" },
    },
    status: {
      code: 200,
      message: "Success",
    },
  };

export const addComment: Promise<
  ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>
> = Promise.resolve(localApiResponse);
