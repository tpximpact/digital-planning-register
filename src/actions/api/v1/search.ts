"use server";

// Types
import { ApiResponse, DprApplication, SearchParams } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * @swagger
 * /api/docs?handler=ApiV1&method=search:
 *  get:
 *   tags:
 *     - ApiV1
 *   summary: Search for a planning application
 *   description: Returns all planning applications, or ones matching a query. Can also be extended in the future for advanced search
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/page'
 *    - $ref: '#/components/parameters/resultsPerPage'
 *    - $ref: '#/components/parameters/searchQuery'
 *   responses:
 *     200:
 *       $ref: '#/components/responses/Search'
 *     400:
 *       $ref: '#/components/responses/ApiError'

 */
export async function search(
  source: string,
  council: string,
  searchParams?: SearchParams,
): Promise<ApiResponse<DprApplication[] | undefined>> {
  if (!council) {
    return apiReturnError("Council is required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.search(council, searchParams);
    case "local":
      return await LocalV1.search(searchParams);
    default:
      return apiReturnError("Invalid source");
  }
}
