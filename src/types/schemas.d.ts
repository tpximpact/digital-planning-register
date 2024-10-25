import {
  DprPagination,
  DprApplication,
  DprPagination,
  DprDocument,
  DprComment,
  DprApplicationSubmissionData,
  DprComment,
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
  pagination: DprPagination;
  files: DprDocument[];
}

/**
 * This is our own schema for the documents for an application
 */
export interface DprApiComments {
  pagination: DprPagination;
  data: DprComment[];
}

export interface DprApiApplicationSubmission {
  application: DprApplication["property"]["boundary"]["site"];
  submission: DprApplicationSubmissionData | null;
}
