"use server";

// Types
import { ApiResponse, DprSearch, SearchParams } from "@/types";

// handlers
import { BopsP05 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * @swagger
 * /api/docs?handler=ApiP05&method=search:
 *  get:
 *   tags:
 *     - ApiP05
 *   summary: Search for a planning application
 *   description: Returns all planning applications, or ones matching a query. Can also be extended in the future for advanced search
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/page'
 *    - $ref: '#/components/parameters/resultsPerPage'
 *    - $ref: '#/components/parameters/searchQuery'
 *    - $ref: '#/components/parameters/searchType'
 *   responses:
 *     200:
 *       $ref: '#/components/responses/Search'
 *     400:
 *       $ref: '#/components/responses/ApiError'

 */
export async function search(
  source: string,
  council: string,
  search?: SearchParams,
): Promise<ApiResponse<DprSearch | null>> {
  if (!council) {
    return apiReturnError("Council is required");
  }

  switch (source) {
    case "bops":
      return await BopsP05.search(council, search);
    case "local":
      return await LocalV1.search(search);
    default:
      return apiReturnError("Invalid source");
  }
}
