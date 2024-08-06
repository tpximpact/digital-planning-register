import {
  V2PlanningApplicationsReference,
  V2PublicPlanningApplicationDocuments,
} from "../bops-api-v2";
import { DprComment } from "../definitions/comments";
import { DprDocument } from "../definitions/documents";

/**
 * This is our own schema for the application details
 * BOPS calls this ApplicationReference because we fetch the details via reference
 */
export interface DprApplicationPublicDocuments
  extends V2PublicPlanningApplicationDocuments {
  files: DprDocument[];
}
