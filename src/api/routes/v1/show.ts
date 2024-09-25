"use server";

// Types

import { ApiResponse, DprPublicApplicationDetails } from "@/types";

// handlers
import { BopsV2 } from "@/api/handlers/bops";
import { LocalV1 } from "@/api/handlers/local";

/**
 * @swagger
 * /api/v1/show:
 *  get:
 *   tags:
 *     - ApiV1
 *   summary: Show a planning application
 *   description: Returns the planning application
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/reference'
 *   responses:
 *     200:
 *       description: Hello World!
 */
export async function show(
  source: string,
  council: string,
  reference: string,
): Promise<ApiResponse<DprPublicApplicationDetails | null>> {
  // @TODO validate this output against the ODP (and BOPS) schemas

  console.log(source, council, reference);

  if (!council || !reference) {
    return {
      data: null,
      status: {
        code: 400,
        message: "Bad request",
        detail: "Council and reference are required",
      },
    };
  }

  switch (source) {
    case "bops":
      return await BopsV2.getPublicApplicationDetails(council, reference);
    case "local":
    default:
      return LocalV1.show;
  }
}
