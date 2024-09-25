"use server";

// Types

import { ApiResponse, DprPublicApplicationDocuments } from "@/types";

// handlers
import { v2 } from "@/api/handlers/bops";
import * as local from "@/api/handlers/local";

/**
 * @swagger
 * /api/v1/documents:
 *  get:
 *   tags:
 *     - V1
 *   summary: Get documents for a planning application
 *   description: Returns the planning application
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/reference'
 *   responses:
 *     200:
 *       description: Hello World!
 */
export async function documents(
  source: string,
  council: string,
  reference: string,
): Promise<ApiResponse<DprPublicApplicationDocuments | null>> {
  // @TODO validate this output against the ODP (and BOPS) schemas

  console.log(source, council, reference);

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
      return await v2.getPublicApplicationDocuments(council, reference);
    case "local":
    default:
      return local.documents;
  }
}
