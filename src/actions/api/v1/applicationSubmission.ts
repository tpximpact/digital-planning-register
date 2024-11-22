"use server";

// Types
import { ApiResponse, DprApplicationSubmissionApiResponse } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * /api/docs?handler=ApiV1&method=applicationSubmission
 */
export async function applicationSubmission(
  source: string,
  council: string,
  reference: string,
): Promise<ApiResponse<DprApplicationSubmissionApiResponse | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.applicationSubmission(council, reference);
    case "local":
      return await LocalV1.applicationSubmission(council, reference);
    default:
      return apiReturnError("Invalid source");
  }
}
