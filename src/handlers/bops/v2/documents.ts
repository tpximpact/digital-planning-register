"use server";

import { applicationFormObject } from "@/lib/planningApplication";
import { ApiResponse, DprDocumentsApiResponse } from "@/types";
import { BopsV2PublicPlanningApplicationDocuments } from "@/handlers/bops/types";
import {
  convertBopsDocumentPagination,
  convertDocumentBopsFile,
} from "../converters/documents";
import { handleBopsGetRequest } from "../requests";

export async function documents(
  council: string,
  reference: string,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> {
  const url = `public/planning_applications/${reference}/documents`;
  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationDocuments | null>
  >(council, url);

  if (!request.data) {
    return { ...request, data: null };
  }

  const {
    files = [],
    metadata = {
      results: 0,
      totalResults: 0,
    },
    ...restData
  } = request.data || {};

  // add fake application form document
  const applicationFormDocument = applicationFormObject(council, reference);

  const convertedData = {
    pagination: convertBopsDocumentPagination(metadata),
    files: [applicationFormDocument, ...files.map(convertDocumentBopsFile)],
  };

  return { ...request, data: convertedData };
}
