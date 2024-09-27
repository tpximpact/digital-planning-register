import { DprDocument, DprPaginationBase } from "@/types";
import { BopsDocumentsMetadata, BopsFile } from "@/api/handlers/bops/types";

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
