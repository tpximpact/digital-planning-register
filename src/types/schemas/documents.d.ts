import { DprPaginationBase } from "../definitions/pagination";
import { DprDocument } from "../definitions/documents";

/**
 * This is our own schema for the documents for an application
 */
export interface DprDocuments {
  pagination: DprPaginationBase;
  files: DprDocument[];
}
