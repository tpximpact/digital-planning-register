import { DprDocument, DprPaginationBase } from "@/types";
import {
  BopsDocumentsMetadata,
  BopsFile,
  BopsNonStandardDocument,
} from "@/handlers/bops/types";
import { convertDateTimeToUtc, formatTag } from "@/util";

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
    createdDate: document.createdAt
      ? convertDateTimeToUtc(document.createdAt)
      : undefined,
    metadata: {
      byteSize: document.metadata?.byteSize,
      contentType: document.metadata?.contentType,
    },
  };
};

/**
 * Converts BOPS documents into our standard format
 * @param comment
 * @returns
 */
export const convertDocumentBopsNonStandard = (
  document: BopsNonStandardDocument,
): DprDocument => {
  return {
    url: document.url,
    title:
      document?.tags?.length > 0
        ? document.tags.map(formatTag).join(", ")
        : "Unnamed Document",
    createdDate: document.created_at
      ? convertDateTimeToUtc(document.created_at)
      : undefined,
  };
};
