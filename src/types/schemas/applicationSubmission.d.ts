import { DprPlanningApplicationOverview } from "../definitions/planningApplication";
import { DprApplicationSubmissionData } from "../definitions/applicationSubmission";

export interface DprApplicationSubmission {
  application: DprPlanningApplicationOverview;
  submission: DprApplicationSubmissionData | null;
}
