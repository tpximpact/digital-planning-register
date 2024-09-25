"use server";

// Types

import { ApiResponse, DprPublicApplicationDetails } from "@/types";

// handlers
import { v1 } from "@/api/handlers/bops";
import * as local from "@/api/handlers/local";
import { id } from "date-fns/locale";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/types/api/bops";

/**
 * @swagger
 * /api/P01/submitComment:
 *  post:
 *   tags:
 *     - P01
 *   summary: Submit comment for a planning application
 *   description: |
 *     Submit a comment for a planning application, currently sends to v1 BOPS API
 *   parameters:
 *    - $ref: '#/components/parameters/source'
 *    - $ref: '#/components/parameters/council'
 *    - $ref: '#/components/parameters/id'
 *   responses:
 *     200:
 *       description: Hello World!
 */
export async function submitComment(
  source: string,
  council: string,
  id: number,
  apiData: object,
): Promise<ApiResponse<BopsV1PlanningApplicationsNeighbourResponse | null>> {
  // @TODO validate this output against the ODP (and BOPS) schemas

  console.log(source, council, id, apiData);

  if (!council || !id || !apiData) {
    return {
      data: null,
      status: {
        code: 400,
        message: "Bad request",
        detail: "Council, reference and apiData are required",
      },
    };
  }

  switch (source) {
    case "bops":
      return await v1.postComment(council, id, apiData);
    case "local":
    default:
      return local.show;
  }
}
