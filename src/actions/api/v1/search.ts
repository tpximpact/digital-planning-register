"use server";

// Types
import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * /api/docs?handler=ApiV1&method=search
 */
export async function search(
  source: string,
  council: string,
  SearchParams?: SearchParams,
): Promise<ApiResponse<DprSearchApiResponse | null>> {
  if (!council) {
    return apiReturnError("Council is required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.search(council, SearchParams);
    case "local":
      return await LocalV1.search(SearchParams);
    default:
      return apiReturnError("Invalid source");
  }
}
