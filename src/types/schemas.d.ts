/**
 * Each type in this file represents a schema for a specific type of data returnd by the DPR "API".
 * search
 * show
 * documents
 * applicationSubmission
 */

import { DprApplication, DprDocument, DprPagination } from "./definitions";
import { DprApplicationSubmissionData } from "./applicationSubmission";
import { PrototypeApplication } from "odp-types/schemas/prototypeApplication";

/**
 * /api/search
 * Listing of applications and search results
 */
export interface DprApiSearchResponse {
  pagination: DprPagination;
  data: DprApplication[];
}

/**
 * /api/show
 * Details view of a single application
 */
export interface DprApiShowResponse extends DprApplication {}

/**
 * /api/documents
 * Documents for a single application
 */
export interface DprApiDocumentsResponse {
  pagination: DprPaginationBase;
  files: DprDocument[];
}

/**
 * /api/applicationSubmission
 * Documents for a single application
 */
export interface DprApiApplicationSubmissionResponse {
  application: DprApplication["application"];
  submission: PrototypeApplication | null;
}
