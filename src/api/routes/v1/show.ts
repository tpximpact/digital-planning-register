"use server";

// Types
import { ApiResponse, DprPublicApplicationDetails } from "@/types";

// handlers
import { BopsV2 } from "@/api/handlers/bops";
import { LocalV1 } from "@/api/handlers/local";
import { apiReturnError } from "@/api/lib";

/**
 * @swagger
 * /api/docs?handler=ApiV1&method=show:
 *  get:
 *   tags:
 *     - ApiV1
 *   summary: Return the planning application details
 *   description: Return the planning application details
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/reference'
 *   responses:
 *     200:
 *       $ref: '#/components/responses/ApplicationDetails'
 *     400:
 *       $ref: '#/components/responses/ApiError'

 */
export async function show(
  source: string,
  council: string,
  reference: string,
): Promise<ApiResponse<DprPublicApplicationDetails | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.getPublicApplicationDetails(council, reference);
    case "local":
      return LocalV1.show;
    default:
      return apiReturnError("Invalid source");
  }
}
