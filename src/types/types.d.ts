/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { AssessmentDecision } from "@/types/odp-types/schemas/postSubmissionApplication/enums/AssessmentDecision";

/**
 * This file contains the definitions for common objects used accross the application
 *
 * ApiResponse - the standard response object from the API
 * DprPagination - the object that describes the pagination of a list of objects
 * SearchParams - common object to represent search parameters
 * Documentation - common object to represent documentation for a handler
 * DprStatusSummary - the dpr version of the application status
 * DprDecisionSummary - the dpr version of the decision summary
 */

/**
 *
 *
 *
 * ApiResponse
 * Standardises what we expect to be returned as BOPS either gives us data or an error
 *
 *
 *
 */
export interface ApiResponse<T> {
  data: T | null;
  pagination?: DprPagination;
  status?: {
    code: number;
    message: string;
    detail?: string;
  };
}

/**
 *
 *
 *
 * SearchParams
 * common object to represent search parameters
 *
 *
 *
 */
export interface SearchParams {
  query?: string;
  page: number;
  resultsPerPage: number;
  /**
   * beginning of advanced search P05
   * also used for comments filtering
   */
  type?: string;
}

/**
 *
 *
 *
 * DprPagination
 * the object that describes the pagination of a list of objects
 * @todo rename these to PascalCase
 *
 *
 *
 */
export interface DprPaginationBase {
  results: number;
  total_results: number;
}

export interface DprPagination extends DprPaginationBase {
  page: number;
  from: number;
  to: number;
  total_pages: number;
}

/**
 *
 *
 *
 * Documentation
 * common object to represent documentation for a handler
 *
 *
 *
 */
export interface Documentation {
  url: string;
  file: string;
  description: string | JSX.Element;
  arguments?: string[];
  run: Awaited<(...args) => void>;
  validate?: {
    url: string;
    type: "application" | "prototypeApplication";
  }[];
  examples?: {
    url: string;
    description: string;
    source?: string[];
  }[];
  source?: string[];
}

/**
 *
 *
 *
 * DprStatusSummary
 * the dpr version of the application status
 *
 *
 *
 */
export type DprStatusSummary =
  | "Application submitted"
  | "Application returned"
  | "Consultation in progress"
  | "Assessment in progress"
  | "Determined"
  | "Withdrawn"
  | "Appeal lodged"
  | "Appeal validated"
  | "Appeal in progress"
  | "Appeal decided"
  | "Unknown";

/**
 *
 *
 *
 * DprDecisionSummary
 * the dpr version of the decision summary
 *
 *
 *
 */
type DprPriorApprovalDecision =
  | "Prior approval required and approved"
  | "Prior approval not required"
  | "Prior approval required and refused";

export type DprDecisionSummary = AssessmentDecision | DprPriorApprovalDecision;
