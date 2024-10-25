import { DprDocument, DprPagination, SearchParams } from "@/types";
import { createItemPagination } from "./pagination";

/**
 * helper method to build a document data object in the format required by the frontend
 * @param documents
 * @param searchParams
 * @returns
 */
export const buildDocumentData = (
  documents: DprDocument[],
  searchParams?: SearchParams,
) => {
  const totalDocuments = documents ? documents.length : 0;
  const currentPage = Number(searchParams?.page ?? 1);
  const maxDisplayDocuments = 10;
  const documentData: { pagination: DprPagination; data: DprDocument[] } = {
    pagination: {
      ...createItemPagination(totalDocuments, currentPage, maxDisplayDocuments),
    },
    data: documents ? [...documents] : [],
  };
  return documentData;
};
