import { Date } from "../../../shared/utils";
import { PrimaryApplicationType } from "../../prototypeApplication/enums/ApplicationType";
import { AssessmentDecision } from "../enums/AssessmentDecision";

/**
 * 'Granted', 'Refused', 'Prior approval required and approved', 'Prior approval not required', 'Prior approval required and refused';
 */
type AssessmentBase = {
  councilDecision: AssessmentDecision;

  /**
   * YYYY-MM-DD
   * Follows convention of if date in the name it is YYYY-MM-DD
   * the date that the application went to committee
   */
  committeeSentDate?: Date;
  /**
   * If an application went to committee what was their decision
   * @todo check what decision options are available
   */
  committeeDecision?: AssessmentDecision;
};

export type PriorApprovalAssessment = AssessmentBase & {
  /**
   * Only applies for prior approval applications so we can say 'Prior approval required and approved', 'Prior approval not required', 'Prior approval required and refused';
   */
  priorApprovalRequired: boolean;
};

/**
 * TypeMap of PrimaryApplicationTypes to their specific Assessment models
 */
type AssessmentVariants = {
  pa: PriorApprovalAssessment;
};

/**
 * @internal Conditional type to return a specific or generic Property model, based on PrimaryApplicationType
 */
export type Assessment<TPrimary extends PrimaryApplicationType> =
  TPrimary extends keyof AssessmentVariants
    ? AssessmentVariants[TPrimary]
    : AssessmentBase;
