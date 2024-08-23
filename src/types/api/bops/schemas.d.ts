import { BopsApplicationSubmission } from "./application-submission";
import {
  BopsApplicationOverview,
  BopsNonStandardApplication,
  BopsPlanningApplication,
  BopsSearchLinks,
  BopsSearchMetadata,
  BopsApplicationSubmission,
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

/**
 * GET /api/v2/public/planning_applications/{reference}
 */
export interface BopsV2PublicPlanningApplicationDetail
  extends BopsPlanningApplication {}

/**
 * GET /api/v2/planning_applications/{reference}
 * this interface is temporary until we get the data from the public endpoint
 */
export interface BopsV2PlanningApplicationDetail
  extends Pick<
    BopsNonStandardApplication,
    | "id"
    | "applicant_first_name"
    | "applicant_last_name"
    | "agent_first_name"
    | "agent_last_name"
    | "documents"
  > {}

/**
 * GET /api/v2/public/planning_applications/{reference}/documents
 */
export interface BopsV2PublicPlanningApplicationDocuments {
  metadata: BopsDocumentsMetadata;
  application: BopsApplicationOverview;
  files: BopsFile[];
  decisionNotice: {
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
