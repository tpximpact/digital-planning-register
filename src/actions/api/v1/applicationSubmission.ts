"use server";

// Types
import { ApiResponse, DprApplicationSubmission } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * @swagger
 * /api/docs?handler=ApiV1&method=applicationSubmission:
 *  get:
 *   tags:
 *     - ApiV1
 *   summary: View the raw application submission data
 *   description: Returns the planning application
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/reference'
 *   responses:
 *     200:
 *       $ref: '#/components/responses/ApplicationSubmission'
 *     400:
 *       $ref: '#/components/responses/ApiError'
 */
export async function applicationSubmission(
  source: string,
  council: string,
  reference: string,
): Promise<ApiResponse<DprApplicationSubmission | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.applicationSubmission(council, reference);
    case "local":
      return await LocalV1.applicationSubmission();
    default:
      return apiReturnError("Invalid source");
  }
}
