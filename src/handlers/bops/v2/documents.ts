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
import { ApiResponse, DprDocumentsApiResponse } from "@/types";
import { BopsV2PublicPlanningApplicationDocuments } from "@/handlers/bops/types";
import { convertDocumentBopsFile } from "../converters/documents";
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

  const convertedData = [
    applicationFormDocument,
    ...(decisionNoticeDocument ? [decisionNoticeDocument] : []),
    ...files.map(convertDocumentBopsFile),
  ];

  return { ...request, data: convertedData };
}
