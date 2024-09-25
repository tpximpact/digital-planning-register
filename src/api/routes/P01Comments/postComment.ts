"use server";

// Types

import { ApiResponse, DprPublicApplicationDetails } from "@/types";

// handlers
import { BopsV1 } from "@/api/handlers/bops";
import { BopsV1PlanningApplicationsNeighbourResponse } from "@/types/api/bops";
import { LocalV1 } from "@/api/handlers/local";

/**
 * @swagger
 * /api/P01/postComment:
 *  post:
 *   tags:
 *     - P01 Comment Submission
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
export async function postComment(
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
      return await BopsV1.postComment(council, id, apiData);
    case "local":
    default:
      return LocalV1.postComment;
  }
}
