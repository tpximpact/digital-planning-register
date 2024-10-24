import {
  DprPagination,
  DprApplication,
  DprPaginationBase,
  DprDocument,
  DprApplicationSubmissionData,
} from "@/types";

/**
 * This is our own schema for the application details
 * BOPS calls this ApplicationReference because we fetch the details via reference
 */
export interface DprApiSearch {
  pagination: DprPagination;
  data: DprApplication[];
}

export interface DprApiShow extends DprApplication {}

/**
 * This is our own schema for the documents for an application
 */
export interface DprApiDocuments {
  pagination: DprPaginationBase;
  files: DprDocument[];
}

export interface DprApiApplicationSubmission {
  application: DprApplication["property"]["boundary"]["site"];
  submission: DprApplicationSubmissionData | null;
}
