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

import {
  BopsApplicationOverview,
  BopsNonStandardApplication,
  BopsPlanningApplication,
  BopsSearchLinks,
  BopsSearchMetadata,
} from "./definitions/application";
import { BopsDocumentsMetadata, BopsFile } from "./definitions/document";

/**
 * GET /api/v2/public/planning_applications/search
 * #/components/schemas/Search
 */
export interface BopsV2PublicPlanningApplicationsSearch {
  metadata: BopsSearchMetadata;
  links: BopsSearchLinks;
  data: BopsPlanningApplication[];
}

interface DeterminedStatus {
  code: number;
  message: string;
}
/**
 * GET /api/v2/planning_applications/determined
 */
export interface BopsV2Determined {
  metadata: BopsSearchMetadata;
  data: DSNPlanningApplication[];
  status: DeterminedStatus;
}

/**
 * GET /api/v2/public/planning_applications/{reference}
 */
export type BopsV2PublicPlanningApplicationDetail = BopsPlanningApplication;

/**
 * GET /api/v2/planning_applications/{reference}
 * this interface is temporary until we get the data from the public endpoint
 */
export type BopsV2PlanningApplicationDetail = Pick<
  BopsNonStandardApplication,
  | "id"
  | "applicant_first_name"
  | "applicant_last_name"
  | "agent_first_name"
  | "agent_last_name"
  | "documents"
>;

/**
 * GET /api/v2/public/planning_applications/{reference}/documents
 */
export interface BopsV2PublicPlanningApplicationDocuments {
  metadata: BopsDocumentsMetadata;
  application: BopsApplicationOverview;
  files: BopsFile[];
  decisionNotice?: {
    name: string;
    url: string;
  };
}
/**
 * GET /api/v2/planning_applications/{reference}/submission
 */
export interface BopsV2PlanningApplicationsSubmission {
  application: BopsApplicationOverview;
  submission: BopsApplicationSubmissionData | null;
}

/**
 * POST /api/v1/planning_applications/{id}/neighbour_responses
 */
export interface BopsV1PlanningApplicationsNeighbourResponse {
  id: string;
  message: string;
}
