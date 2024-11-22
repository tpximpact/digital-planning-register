"use server";

// Types
import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";

// handlers
import { BopsP05 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * /api/docs?handler=ApiP05&method=search:
 */
export async function search(
  source: string,
  council: string,
  search?: SearchParams,
): Promise<ApiResponse<DprSearchApiResponse | null>> {
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
