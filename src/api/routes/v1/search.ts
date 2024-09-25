"use server";

// Types

import { ApiResponse, DprPublicApplicationListings } from "@/types";

// handlers
import { v2 } from "@/api/handlers/bops";
import * as local from "@/api/handlers/local";
import { SearchParams } from "@/api/types";
import { DSNApplicationListings } from "@/types/schemas/digital-site-notice";

/**
 * @swagger
 * /api/v1/search:
 *  get:
 *   tags:
 *     - V1
 *   summary: Search for a planning application
 *   description: Returns all planning applications, or ones matching a query. Can also be extended in the future for advanced search
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/page'
 *    - $ref: '#/components/parameters/resultsPerPage'
 *    - $ref: '#/components/parameters/search'
 *   responses:
 *     200:
 *       description: Hello World!
 */
export async function search(
  source: string,
  council: string,
  search?: SearchParams,
): Promise<
  ApiResponse<DprPublicApplicationListings | DSNApplicationListings | null>
> {
  // @TODO validate this output against the ODP (and BOPS) schemas

  // @TODO page and resultsPerPage defaults

  console.log(source, council, search);

  if (!council) {
    return {
      data: null,
      status: {
        code: 400,
        message: "Bad request",
        detail: "Council is required",
      },
    };
  }

  switch (source) {
    case "bops":
      if (search?.type === "dsn") {
        return await v2.getDSNApplication(council, search);
      } else {
        return await v2.getPublicApplications(council, search);
      }
    case "local":
    default:
      return local.search(search);
  }
}
