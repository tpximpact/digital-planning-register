import { DprApplicationSubmissionSubtopic } from "@/types";
import { Section } from "./section";
import "./ApplicationForm.scss";

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

export default ApplicationForm;
