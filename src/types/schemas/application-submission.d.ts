import { DprApplicationSubmissionData } from "../definitions/application-submission";
import { DprPlanningApplicationOverview } from "../definitions/planning-application";

export interface DprApplicationSubmission {
  application: DprPlanningApplicationOverview;
  submission: DprApplicationSubmissionData | null;
}
