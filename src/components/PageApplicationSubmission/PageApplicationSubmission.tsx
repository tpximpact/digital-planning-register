import { formatIsoDateTime } from "@/util";
import { BackLink } from "../button";
import ApplicationForm from "../application_form";

export interface PageApplicationSubmissionProps {
  reference: string;
  applicationSubmissionData?: any;
  submittedAt?: string;
}

export const PageApplicationSubmission = ({
  reference,
  applicationSubmissionData,
  submittedAt,
}: PageApplicationSubmissionProps) => {
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">Application form as submitted</h1>
        <p className="govuk-body">
          This is the full application form as submitted by the applicant to the
          planning team.
        </p>
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Application Reference</h2>
            <p>{reference}</p>
          </div>

          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Submitted</h2>
            <div>
              {submittedAt ? (
                formatIsoDateTime(submittedAt)
              ) : (
                <p className="govuk-body">Date not available</p>
              )}
            </div>
          </div>
        </div>
        {applicationSubmissionData && applicationSubmissionData.length > 0 ? (
          <ApplicationForm submissionData={applicationSubmissionData} />
        ) : (
          <p className="govuk-body">Submission data not available</p>
        )}
      </div>
    </>
  );
};
