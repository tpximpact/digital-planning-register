/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

"use server";

import { applicationFormObject } from "@/lib/planningApplication";
import decisionNoticeObject from "@/lib/planningApplication/decisionNotice";
import {
  ApiResponse,
  DprDocumentsApiResponse,
  SearchParamsDocuments,
} from "@/types";
import { BopsV2PublicPlanningApplicationDocuments } from "@/handlers/bops/types";
import { convertDocumentBopsFile } from "../converters/documents";
import { handleBopsGetRequest } from "../requests";
import { getAppConfig } from "@/config";

export async function documents(
  council: string,
  reference: string,
  searchParams?: SearchParamsDocuments,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> {
  const appConfig = getAppConfig(council);
  const resultsPerPage = searchParams?.resultsPerPage
    ? searchParams.resultsPerPage
    : appConfig.defaults.resultsPerPage;

  const url = `public/planning_applications/${reference}/documents`;
  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PublicPlanningApplicationDocuments | null>
  >(council, url);

  if (!request.data) {
    return { ...request, data: null };
  }

  const { files = [] } = request.data || {};

  // add fake application form document
  const applicationFormDocument = applicationFormObject(council, reference);

  const { decision } = request?.data?.application || {};
  const decisionNoticeUrl = request?.data?.decisionNotice?.url;

  // Create the decision notice document if applicable
  const decisionNoticeDocument =
    decision && decisionNoticeUrl
      ? decisionNoticeObject(decisionNoticeUrl)
      : null;

  const currentPage = searchParams?.page || 1; // Default to page 1 if not provided
  const from = (currentPage - 1) * resultsPerPage;
  const to = from + resultsPerPage;

  // Add extra documents only on the first page
  const extraDocuments =
    currentPage === 1
      ? [
          applicationFormDocument,
          ...(decisionNoticeDocument ? [decisionNoticeDocument] : []),
        ]
      : [];

  // Adjust the slice range to account for extra documents on the first page
  const adjustedTo = currentPage === 1 ? to - extraDocuments.length : to;

  // Slice the documents and convert them
  const documentsOnPage = files.slice(from, adjustedTo);
  const convertedData = [
    ...extraDocuments,
    ...documentsOnPage.map(convertDocumentBopsFile),
  ];

  return { ...request, data: convertedData };
}
