import { DprPagination } from "../definitions/pagination";
import { DprPlanningApplication } from "../definitions/planningApplication";

/**
 * This is our own schema for the application details
 * BOPS calls this ApplicationReference because we fetch the details via reference
 */
export interface DprSearch {
  pagination: DprPagination;
  data: DprPlanningApplication[];
}
