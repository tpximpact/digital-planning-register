import { Date } from "../../../shared/utils";
import { PrimaryApplicationType } from "../../prototypeApplication/enums/ApplicationType";
import { AssessmentDecision } from "../enums/AssessmentDecision";

/**
 * 'Granted', 'Refused', 'Prior approval required and approved', 'Prior approval not required', 'Prior approval required and refused';
 */
type AssessmentBase = {
  /**
   * This is the decision made by the council
   */
  councilDecision?: AssessmentDecision;
  /**
   * YYYY-MM-DD
   * This is the date the decision was made by the council
   */
  councilDecisionDate?: Date;

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
  /**
   * YYYY-MM-DD
   * The date the committee made their decision
   */
  committeeDecisionDate?: Date;
};

export type PriorApprovalAssessment = AssessmentBase & {
  /**
   * Council decision is optional - if prior approval is not required then neither is a council decision
   */
  councilDecision?: AssessmentDecision;
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
