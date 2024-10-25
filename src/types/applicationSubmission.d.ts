import { DprBoundaryGeojson } from "./boundaryGeojson";

export interface DprApplicationSubmissionData {
  data: DprApiApplicationSubmissionResponseSubtopic[];
  metadata: {
    submittedAt: string;
    /**
     * This is the raw JSON string of the submission - in case we need to display just that at some point in the future
     */
    raw: string;
  };
}

/**
 * We convert into subtopic and value pairs
 */
export interface DprApiApplicationSubmissionResponseSubtopic {
  subtopic: string;
  value: DprApiApplicationSubmissionResponseSubtopicValue[];
}

export interface DprApiApplicationSubmissionResponseSubtopicValue {
  description: string;
  value:
    | string
    | null
    | JSX.Element
    | DprApiApplicationSubmissionResponseSubtopicValue[];
  map?: DprBoundaryGeojson;
}
