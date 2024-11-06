"use server";

// Types
import { ApiResponse, DprDocumentsApiResponse, SearchParams } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * @swagger
 * /docs/json?handler=ApiV1&method=documents:
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
  searchParams?: SearchParams,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.documents(council, reference);
    case "local":
      return await LocalV1.documents(council, reference, searchParams);
    default:
      return apiReturnError("Invalid source");
  }
}
