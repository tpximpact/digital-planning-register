/**
 * Helpers related to comments
 */

import { BopsNonStandardDocument } from "@/types";
import { DprDocument } from "@/types/definitions/documents";
import { formatTag } from "../../util/formatTag";
import { BopsFile } from "@/types/bops-api-v2/schemas/documents";

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
    created_at: document.created_at,
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
    ...document.metadata,
  };
};
