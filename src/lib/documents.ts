import { DprDocument, DprPagination, SearchParams } from "@/types";
import { createItemPagination } from "./pagination";

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

/**
 * This generates a fake document - currently using the BopsNonStandardDocument type
 * @todo this will soon not be compatible with the new document type
 * Its added per page as opposed to at a higher level since we fetch the data at each load anyway,
 * it might be worth looking into if this affects caching for data fetching at some point though
 * @param council
 * @param reference
 * @returns
 */
export const applicationFormObject = (
  council: string,
  reference: string,
): DprDocument => {
  return {
    url: `/${council}/${reference}/application-form`,
    title: "Application form",
    metadata: {
      contentType: "text/html",
    },
  };
};
