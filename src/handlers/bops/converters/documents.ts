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
import type { PostSubmissionFileAssociation } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/FileAssociation.ts";
import type { PrototypeFileType as FileType } from "digital-planning-data-schemas/types/schemas/prototypeApplication/enums/FileType.ts";
/**
 * Converts BOPS files into our standard format
 * @param document
 * @returns
 */
export const convertDocumentBopsFile = (
  document: BopsFile,
  association: PostSubmissionFileAssociation = "application",
): DprDocument => {
  return {
    id: Math.ceil(Math.random() * 10000),
    name: document.name ?? "Unnamed document",
    association: association ?? "application",
    // nb not validating here yet as its not needed in DPR (yet)
    type: Array.isArray(document.type)
      ? (document.type.map((t) => t.value) as FileType[])
      : ["otherDocument"],
    url: document.url,
    metadata: {
      size: {
        bytes: document.metadata?.byteSize ?? 0,
      },
      mimeType: document.metadata?.contentType ?? "application/octet-stream",
      createdAt: convertDateTimeToUtc(document.createdAt),
      submittedAt: convertDateTimeToUtc(document.createdAt),
      validatedAt: convertDateTimeToUtc(document.createdAt),
      publishedAt: convertDateTimeToUtc(document.createdAt),
    },
  };
};

export const convertBopsDocumentEndpointToDprDocumentEndpoint = (
  documents: BopsFile[],
  totalResults: number,
  searchParams: SearchParamsDocuments,
  status: ApiResponse<DprDocument[]>["status"],
): ApiResponse<DprDocumentsApiResponse> => {
  const convertedDocuments = documents.map((file) =>
    convertDocumentBopsFile(file),
  );
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
