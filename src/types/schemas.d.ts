/**
 * Each type in this file represents a schema for a specific type of data returnd by the DPR "API".
 * search
 * show
 * documents
 * applicationSubmission
 */
import { DprPlanningApplication, DprDocument } from "./definitions";
import { DprApplicationSubmissionData } from "./applicationSubmission";
import { DprPaginationBase, DprPagination } from "./types";

/**
 * /api/search
 * Listing of applications and search results
 */
export interface DprSearchApiResponse {
  pagination: DprPagination;
  data: DprPlanningApplication[] | null;
}

/**
 * /api/show
 * Details view of a single application
 */
export interface DprShowApiResponse extends DprPlanningApplication {}

/**
 * /api/documents
 * Documents for a single application
 */
export interface DprDocumentsApiResponse {
  pagination: DprPaginationBase;
  files: DprDocument[];
}

/**
 * /api/applicationSubmission
 * Documents for a single application
 */
export interface DprApplicationSubmissionApiResponse {
  application: DprPlanningApplication["application"];
  submission: DprApplicationSubmissionData | null;
}
