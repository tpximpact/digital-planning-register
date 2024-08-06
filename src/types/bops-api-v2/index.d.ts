/**
 * This file contains the interfaces and types for the BOPS API v2
 * Swagger documentation: https://camden.bops-staging.services/api/docs/v2/swagger_doc.yaml
 * components:
 *   securitySchemes:
 *   definitions:
 *   schemas:
 * paths:
 *
 *
 * Where something is explicitly defined in the swagger documentation, we will create an interface or
 * type for that in defitions or schemas. If it is not defined in the swagger documentation, we will include it in this file
 *
 *
 */

import { ApplicationSubmission } from "./schemas/application-submission";
import { SearchMetadata, Search } from "./schemas/search";
import { ApplicationOverview } from "./definitions/application-overview";
import { Documents } from "./schemas/documents";
import { DprDocument } from "../definitions/documents";
import { DprComment } from "../definitions/comments";
import { DprBoundaryGeojson } from "../definitions/boundary-geojson";

// ordered in the same order as the swagger documentation

/**
 * GET /api/v2/planning_applications
 * There is no standard schema for this - hence it being deprecated and us moving to different endpoints
 * @deprecated
 */
export interface V2PlanningApplications {
  metadata: SearchMetadata;
  data: NonStandardApplication[];
}

/**
 * GET /api/v2/planning_applications/{id}
 */
export interface V2PlanningApplicationsReference
  extends NonStandardApplication {}

/**
 * GET /api/v2/planning_applications/{reference}/submission
 */
export interface V2PlanningApplicationsSubmission
  extends ApplicationSubmission {}

/**
 * GET /api/v2/planning_applications/search
 * @deprecated
 */
export interface V2PlanningApplicationsSearch extends Search {}

/**
 * GET /api/v2/public/planning_applications/search
 */
export interface V2PublicPlanningApplications extends Search {}

/**
 * GET /api/v2/public/planning_applications/{reference}/documents
 */
export interface V2PublicPlanningApplicationDocuments extends Documents {}

/**
 * The following interfaces are for the deprecated non-standard application format
 * Slowly these will be replaced with the standard format
 */

/**
 * @deprecated
 */
export interface NonStandardApplication {
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
  boundary_geojson: DprBoundaryGeojson;
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

  /**
   * @deprecated ApplicationInformation component wants this field but it doesn't exist in the main API
   * @todo Remove this field from the ApplicationInformation componentor find out if its needed
   */
  decision: string;
}

/**
 * @deprecated
 */
export interface BopsNonStandardComment {
  comment: string;
  received_at: string;
  summary_tag?: string;
}

/**
 * @deprecated
 */
export interface BopsNonStandardDocument {
  url: string;
  /**
   * Optional because of the need to insert fake application form document
   */
  created_at?: string;
  tags: string[];
  numbers: string;
  applicant_description: string | null;

  /**
   * @warning This field is only used by the 'fake' document for application form
   */
  metadata?: {
    contentType: string;
  };
}
