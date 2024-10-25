import {
  DprApiApplicationSubmissionResponseSubtopic,
  DprDocument,
} from "@/types";
import { Section } from "./section";
import { PrototypeApplication } from "odp-types/schemas/prototypeApplication";

interface ApplicationFormProps {
  submission: PrototypeApplication;
}

const ApplicationForm = ({ submission }: ApplicationFormProps) => {
  if (!submission) {
    return null;
  }
  return (
    <div className="govuk-grid-row faux-document">
      <div className="govuk-grid-column-full">
        {submission?.map((el, i) => (
          <Section subtopic={el.subtopic} value={el.value} key={i} />
        ))}
      </div>
    </div>
  );
};

/**
 * DEPRECATED
 * @deprecated
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
    },
  };
};

export default ApplicationForm;
