import { DateTime } from "../../shared/utils";
import { PrototypePlanXMetadata } from "../prototypeApplication/Metadata";

export interface PostSubmissionMetadata extends PrototypePlanXMetadata {
  /**
   * This is the date this application was published to the public
   */
  publishedAt: DateTime;
}
