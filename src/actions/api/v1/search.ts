"use server";

// Types
import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";
import { OpenData } from "@/handlers/opendata/api";

/**
 * /api/docs?handler=ApiV1&method=search
 */
export async function search(
  source: string,
  council: string,
  searchParams?: SearchParams,
): Promise<ApiResponse<DprSearchApiResponse | null>> {
  if (!council) {
    return apiReturnError("Council is required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.search(council, searchParams);
    case "local":
      return await LocalV1.search(searchParams);
    case "opendata":
      return await OpenData.search(council, searchParams);
    default:
      return apiReturnError("Invalid source");
  }
}
