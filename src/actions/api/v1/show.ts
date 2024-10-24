"use server";

// Types
import { ApiResponse, DprApiShow } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

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
): Promise<ApiResponse<DprApiShow | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.show(council, reference);
    case "local":
      return await LocalV1.show(council, reference);
    default:
      return apiReturnError("Invalid source");
  }
}
