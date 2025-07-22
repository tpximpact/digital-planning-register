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

import {
  ApiResponse,
  DprDocument,
  DprDocumentsApiResponse,
  SearchParamsDocuments,
} from "@/types";
import { BopsFile } from "@/handlers/bops/types";
import { convertDateTimeToUtc } from "@/util";

/**
 * Converts BOPS files into our standard format
 * @param document
 * @returns
 */
export const convertDocumentBopsFile = (document: BopsFile): DprDocument => {
  return {
    url: document.url,
    title: document.name ?? "Unnamed document",
    createdDate: document.createdAt
      ? convertDateTimeToUtc(document.createdAt)
      : undefined,
    metadata: {
      byteSize: document.metadata?.byteSize,
      contentType: document.metadata?.contentType,
    },
  };
};

export const convertBopsDocumentEndpointToDprDocumentEndpoint = (
  documents: BopsFile[],
  totalResults: number,
  searchParams: SearchParamsDocuments,
  status: ApiResponse<DprDocument[]>["status"],
): ApiResponse<DprDocumentsApiResponse> => {
  const convertedDocuments = documents.map(convertDocumentBopsFile);
  const allDocuments = [...convertedDocuments];

  const finalTotalResults = totalResults;

  const resultsPerPage = searchParams.resultsPerPage;
  const currentPage = searchParams.page;
  const totalPages = Math.ceil(finalTotalResults / resultsPerPage);

  // Calculate shown documents
  const startIdx = ((currentPage ?? 1) - 1) * (resultsPerPage ?? 10);
  const endIdx = startIdx + (resultsPerPage ?? 10);
  const data = allDocuments.slice(startIdx, endIdx);

  const pagination = {
    resultsPerPage,
    currentPage,
    totalPages,
    totalResults: finalTotalResults,
    totalAvailableItems: finalTotalResults,
  };

  return {
    data: data.length > 0 ? data : null,
    pagination,
    status,
  };
};
