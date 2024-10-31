/**
 * Each type in this file represents a schema for a specific type of data returnd by the DPR "API".
 * search
 * show
 * documents
 * applicationSubmission
 */
import {
  DprPlanningApplication,
  DprPlanningApplicationOverview,
  DprDocument,
} from "./definitions";
import { DprApplicationSubmissionData } from "./applicationSubmission";
import { DprPaginationBase, DprPagination } from "./types";

/**
 * /api/search
 * Listing of applications and search results
 */
export interface DprSearch {
  pagination: DprPagination;
  data: DprPlanningApplication[];
}

/**
 * /api/show
 * Details view of a single application
 */
export interface DprShow extends DprPlanningApplication {}

/**
 * /api/documents
 * Documents for a single application
 */
export interface DprDocuments {
  pagination: DprPaginationBase;
  files: DprDocument[];
}

/**
 * /api/applicationSubmission
 * Documents for a single application
 */
export interface DprApplicationSubmission {
  application: DprPlanningApplicationOverview;
  submission: DprApplicationSubmissionData | null;
}
