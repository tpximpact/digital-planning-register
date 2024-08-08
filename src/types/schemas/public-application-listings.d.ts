import { DprPlanningApplication } from "../definitions/planning-application";
import { DprPagination } from "../definitions/pagination";

/**
 * This is our own schema for the application details
 * BOPS calls this ApplicationReference because we fetch the details via reference
 */
export interface DprPublicApplicationListings {
  pagination: DprPagination;
  data: DprPlanningApplication[];
}
