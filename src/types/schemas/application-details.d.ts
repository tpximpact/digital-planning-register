import { V2PlanningApplicationsReference } from "../bops-api-v2";
import { DprComment } from "../definitions/comments";
import { DprDocument } from "../definitions/documents";

/**
 * This is our own schema for the application details
 * BOPS calls this ApplicationReference because we fetch the details via reference
 */
export interface DprApplicationDetails extends V2PlanningApplicationsReference {
  documents: DprDocument[];
  published_comments: DprComment[];
  consultee_comments: DprComment[];
}
