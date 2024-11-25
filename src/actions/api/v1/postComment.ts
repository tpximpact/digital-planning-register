"use server";

// Types
import { ApiResponse } from "@/types";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/handlers/bops/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * /api/docs?handler=ApiV1&method=postComment
 */
export async function postComment(
  source: string,
  council: string,
  applicationId: number,
  apiData: object,
): Promise<ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>> {
  if (!council || !applicationId || !apiData) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.postComment(council, applicationId, apiData);
    case "local":
      return await LocalV1.postComment(council, applicationId, apiData);
    default:
      return apiReturnError("Invalid source");
  }
}
