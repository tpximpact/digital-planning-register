import {
  DprApplicationSubmissionSubtopic,
  DprApplicationSubmissionSubtopicValue,
  DprDocument,
} from "@/types";
import { Section } from "./section";

interface ApplicationFormProps {
  submissionData: DprApplicationSubmissionSubtopic[] | null;
}

const ApplicationForm = ({ submissionData }: ApplicationFormProps) => {
  if (!submissionData) {
    return null;
  }
  return (
    <div className="govuk-grid-row faux-document">
      <div className="govuk-grid-column-full">
        {submissionData?.map((el, i) => (
          <Section subtopic={el.subtopic} value={el.value} key={i} />
        ))}
      </div>
    </div>
  );
};

/**
 * This generates a fake document - currently using the BopsNonStandardDocument type
 * @todo this will soon not be compatible with the new document type
 * Its added per page as opposed to at a higher level since we fetch the data at each load anyway,
 * it might be worth looking into if this affects caching for data fetching at some point though
 * @param council
 * @param reference
 * @returns
 */
export const ApplicationFormObject = (
  council: string,
  reference: string,
): DprDocument => {
  return {
    url: `/${council}/${reference}/application-form`,
    title: "Application form",
    metadata: {
      contentType: "text/html",
      byteSize: 0,
    },
  };
};

export default ApplicationForm;
