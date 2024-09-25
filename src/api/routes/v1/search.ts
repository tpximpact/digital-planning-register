"use server";

// Types
import { ApiResponse, DprPublicApplicationListings } from "@/types";
import { SearchParams } from "@/api/types";

// handlers
import { BopsV2 } from "@/api/handlers/bops";
import { LocalV1 } from "@/api/handlers/local";
import { apiReturnError } from "@/api/lib";

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
  search?: SearchParams,
): Promise<ApiResponse<DprPublicApplicationListings | null>> {
  if (!council) {
    return apiReturnError("Council is required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.getPublicApplications(council, search);
    case "local":
      return LocalV1.search(search);
    default:
      return apiReturnError("Invalid source");
  }
}
