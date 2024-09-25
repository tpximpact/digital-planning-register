"use server";

// Types
import { ApiResponse, DprPublicApplicationDocuments } from "@/types";

// handlers
import { BopsV2 } from "@/api/handlers/bops";
import { LocalV1 } from "@/api/handlers/local";
import { apiReturnError } from "@/api/lib";

/**
 * @swagger
 * /api/docs?handler=ApiV1&method=documents:
 *  get:
 *   tags:
 *     - ApiV1
 *   summary: Return the documents for a planning application
 *   description: Return the documents for a planning application
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/reference'
 *   responses:
 *     200:
 *       $ref: '#/components/responses/Documents'
 *     400:
 *       $ref: '#/components/responses/ApiError'

 */
export async function documents(
  source: string,
  council: string,
  reference: string,
): Promise<ApiResponse<DprPublicApplicationDocuments | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.getPublicApplicationDocuments(council, reference);
    case "local":
      return LocalV1.documents;
    default:
      return apiReturnError("Invalid source");
  }
}
