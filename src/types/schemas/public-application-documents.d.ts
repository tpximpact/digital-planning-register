import { DprDocument } from "../definitions/documents";
import { DprPaginationBase } from "../definitions/pagination";

/**
 * This is our own schema for the documents for an application
 */
export interface DprPublicApplicationDocuments {
  pagination: DprPaginationBase;
  files: DprDocument[];
}
