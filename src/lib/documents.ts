/**
 * Helpers related to comments
 */

import { DprDocument } from "@/types";
import { BopsDocumentsMetadata, BopsFile } from "@/types/api/bops";
import { DprPaginationBase } from "@/types/definitions/pagination";

/**
 * Converts BOPS files into our standard format
 * @param document
 * @returns
 */
export const convertDocumentBopsFile = (document: BopsFile): DprDocument => {
  return {
    url: document.url,
    title: document.name ?? "Unnamed document",
    created_at: document.createdAt ?? undefined,
    metadata: {
      byteSize: document.metadata?.byteSize,
      contentType: document.metadata?.contentType,
    },
  };
};

/**
 * Converts Bops documents metadata into our standard format
 * @param metadata
 * @returns
 */
export const convertBopsDocumentPagination = (
  metadata: BopsDocumentsMetadata,
): DprPaginationBase => {
  return {
    results: metadata.results,
    total_results: metadata.totalResults,
  };
};
