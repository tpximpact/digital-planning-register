"use server";

// Types
import { ApiResponse, DprDocumentsApiResponse, SearchParams } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";

/**
 * /api/docs?handler=ApiV1&method=documents
 */
export async function documents(
  source: string,
  council: string,
  reference: string,
  searchParams?: SearchParams,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.documents(council, reference);
    case "local":
      return await LocalV1.documents(council, reference, searchParams);
    default:
      return apiReturnError("Invalid source");
  }
}
