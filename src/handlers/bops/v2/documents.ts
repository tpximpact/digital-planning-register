"use server";

import { ApplicationFormObject } from "@/components/application_form";
import DecisionNoticeObject from "@/components/DecisionNotice";
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
  const applicationFormDocument = ApplicationFormObject(council, reference);

  // add fake decision notice document and only show if decision has been made and url is present
  const decision = request?.data?.application?.decision;
  const decisionNotice = request?.data?.decisionNotice;
  const decisionNoticeUrl = decisionNotice?.url;
  const decisionNoticeDocument = DecisionNoticeObject(decisionNoticeUrl);

  const convertedData = {
    pagination: convertBopsDocumentPagination(metadata),
    files: [
      applicationFormDocument,
      ...(decision && decisionNoticeUrl ? [decisionNoticeDocument] : []),
      ...files.map(convertDocumentBopsFile),
    ],
  };

  return { ...request, data: convertedData };
}
