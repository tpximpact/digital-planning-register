import { DprBoundaryGeojson } from "./boundary-geojson";

export interface DprApplicationSubmissionData {
  data: DprApplicationSubmissionSubtopic[];
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
export interface DprApplicationSubmissionSubtopic {
  subtopic: string;
  value: DprApplicationSubmissionSubtopicValue[];
}

export interface DprApplicationSubmissionSubtopicValue {
  description: string;
  value: string | null | JSX.Element | DprApplicationSubmissionSubtopicValue[];
  map?: DprBoundaryGeojson;
}
