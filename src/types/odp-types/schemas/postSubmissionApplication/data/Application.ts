import { PrimaryApplicationType } from "../../prototypeApplication/enums/ApplicationType";
import { ApplicationStatus } from "../enums/ApplicationStatus";
import { ProcessStage } from "../enums/ProcessStage";

type ApplicationBase = {
  /**
   * Unique reference for the application from start to finish
   * @todo this needs to be added into other application schemas
   */
  reference: string;
  /**
   * The current stage the application is at
   * Additional contextual information can be found in the rest of the application
   * @todo certain application types do not have a consultation phase
   */
  stage: ProcessStage;
  /**
   * What is the status of the application
   * Additional contextual information can be found in the rest of the application
   */
  status: ApplicationStatus;
};

/**
 * TypeMap of PrimaryApplicationTypes to their specific Application models
 */
type ApplicationVariants = {};

/**
 * @internal Conditional type to return a specific or generic Property model, based on PrimaryApplicationType
 */
export type Application<TPrimary extends PrimaryApplicationType> =
  TPrimary extends keyof ApplicationVariants
    ? ApplicationVariants[TPrimary]
    : ApplicationBase;
