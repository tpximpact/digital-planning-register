"use server";

// Types
import { ApiResponse } from "@/types";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/api/handlers/bops/types";

// handlers
import { BopsV2 } from "@/api/handlers/bops";
import { LocalV1 } from "@/api/handlers/local";
import { apiReturnError } from "@/api/lib";

/**
 * @swagger
 * /api/docs?handler=ApiV1&method=postComment:
 *  get:
 *   tags:
 *     - ApiV1
 *   summary: View the raw application submission data
 *   description: Returns the planning application
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/id'
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
      return await LocalV1.postComment();
    default:
      return apiReturnError("Invalid source");
  }
}
