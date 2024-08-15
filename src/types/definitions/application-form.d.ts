export interface DprApplicationForm {
  subtopics: SubtopicValue[];
}

interface SubtopicValue {
  subtopic: string;
  value: ValueObject[] | { [key: string]: ValueObject | ValueObject[] };
}

export interface RowProps {
  description: string;
  value: any;
  image?: boolean;
}

export interface Responses {
  metadata: { policyRef: any; sectionName: string };
  question: string;
  responses: ValueObject[];
}

export interface ApplicationFormProps
  extends Pick<BopsV2PlanningApplicationsSubmission, "submission"> {}
