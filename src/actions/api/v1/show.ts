"use server";

// Types
import { ApiResponse, DprShowApiResponse } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * /api/docs?handler=ApiV1&method=show
 */
export async function show(
  source: string,
  council: string,
  reference: string,
): Promise<ApiResponse<DprShowApiResponse | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.show(council, reference);
    case "local":
      return await LocalV1.show(council, reference);
    default:
      return apiReturnError("Invalid source");
  }
}
