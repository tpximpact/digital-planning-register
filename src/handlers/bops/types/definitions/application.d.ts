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

/**
 * Trying to keep all definitions of applications in one place for now
 */

import { BopsBoundaryGeojson } from "./boundary-geojson";
import { BopsNonStandardDocument } from "./document";
import { BopsNonStandardComment } from "./comment";
import { Applicant } from "@/types/odp-types/schemas/prototypeApplication/data/Applicant";
import { ApplicationType } from "@/types/odp-types/schemas/prototypeApplication/enums/ApplicationType.ts";
import { DprDocument } from "@/types";

/**
 * #/components/definitions/ApplicationOverview
 * https://camden.bops-staging.services/api/docs/v2/swagger_doc.yaml
 */
export interface BopsApplicationOverview {
  type: {
    value: ApplicationType;
    description: string;
  };
  reference: string;
  fullReference: string;
  targetDate?: string | null;
  receivedAt: string;
  validAt: string | null;
  publishedAt?: string | null;
  determinedAt?: string | null;
  status:
    | "Appeal allowed"
    | "Appeal dismissed"
    | "Appeal split decision"
    | "Appeal withdrawn"
    | "Appeal lodged"
    | "Appeal valid"
    | "Appeal started"
    | "Appeal determined"
    | "pending"
    | "not_started"
    | "invalid"
    | "assessment_in_progress"
    | "in_assessment"
    | "awaiting_determination"
    | "in_committee"
    | "to_be_reviewed"
    | "determined"
    | "returned"
    | "withdrawn"
    | "closed";
  decision?: string | null;
  appeal?: {
    decision: string;
    decisionDate: string;
    lodgedDate: string;
    startedDate: string;
    validatedDate: string;
    reason?: string;
    documents?: DprDocument[];
  } | null;
  consultation: {
    startDate: string | null;
    endDate: string | null;
    publicUrl?: string | null;

    /**
     * Not included in the listing end point hence optional
     */
    publishedComments?:
      | {
          comment: string;
          receivedAt: string;
          summaryTag: string;
        }[]
      | null;

    /**
     * Not included in the listing end point hence optional
     */
    consulteeComments?:
      | {
          comment: string;
          receivedAt: string;
        }[]
      | null;
  };
}

export interface BopsPlanningApplication {
  application: BopsApplicationOverview;
  property: {
    address: {
      latitude: number;
      longitude: number;
      title: string;
      singleLine: string;
      uprn: string;
      town: string;
      postcode: string;
    };
    boundary: {
      site: BopsBoundaryGeojson;
    };
  };
  proposal: {
    description: string;
  };
  /** waiting on this */
  // allowing any here because this type will be replaced soon
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applicant?: Applicant<any>;
  officer?: {
    name: string;
  } | null;
}

/**
 * this is what the soon to be deprecated endpoint returns
 * @deprecated
 */
interface BopsNonStandardApplication {
  agent_first_name: string;
  agent_last_name: string;
  agent_phone: string;
  agent_email: string;
  applicant_first_name: string;
  applicant_last_name: string;
  user_role: string;
  awaiting_determination_at: string | null;
  to_be_reviewed_at: string | null;
  created_at: string;
  description: string;
  determined_at: string | null;
  determination_date: string;
  id: number;
  invalidated_at: string | null;
  in_assessment_at: string | null;
  payment_reference: string;
  payment_amount: string;
  result_flag: string;
  result_heading: string;
  result_description: string;
  result_override: string;
  returned_at: string | null;
  started_at: string | null;
  status: string;
  target_date: string;
  withdrawn_at: string | null;
  work_status: string;
  boundary_geojson: BopsBoundaryGeojson;
  assigned_user_name: string;
  assigned_user_role: string;
  application_type: string;
  reference: string;
  reference_in_full: string;
  site: {
    address_1: string;
    address_2: string;
    county: string;
    town: string;
    postcode: string;
    uprn: string;
    latitude: string;
    longitude: string;
  };
  received_date: string;
  validAt: string;
  publishedAt?: string | null;
  constraints: string[];
  documents: BopsNonStandardDocument[];
  published_comments: BopsNonStandardComment[];
  consultee_comments: BopsNonStandardComment[];
  consultation: {
    end_date: string | null;
  };
  make_public: boolean;
  decision: string;
}

/**
 * Aligned with #/components/schemas/Search https://camden.bops-staging.services/api/docs/v2/swagger_doc.yaml
 */
export type BopsSearchMetadata = {
  results: number;
  total_results: number;
  page: number;
  from: number;
  to: number;
  total_pages: number;
};

/**
 * Aligned with #/components/schemas/Search https://camden.bops-staging.services/api/docs/v2/swagger_doc.yaml
 */
type BopsSearchLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string;
};
