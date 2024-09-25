"use server";

import { ApplicationFormObject } from "@/components/application_form";
import {
  convertBopsDocumentPagination,
  convertDocumentBopsFile,
} from "@/lib/documents";
import { handleBopsGetRequest } from "@/lib/handlers";
import { ApiResponse, DprPublicApplicationDocuments } from "@/types";
import { BopsV2PublicPlanningApplicationDocuments } from "@/types/api/bops";

export async function getPublicApplicationDocuments(
  council: string,
  reference: string,
): Promise<ApiResponse<DprPublicApplicationDocuments | null>> {
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
  const applicationFormDocument = ApplicationFormObject(council, reference);

  const convertedData = {
    pagination: convertBopsDocumentPagination(metadata),
    files: [applicationFormDocument, ...files.map(convertDocumentBopsFile)],
  };

  return { ...request, data: convertedData };
}
