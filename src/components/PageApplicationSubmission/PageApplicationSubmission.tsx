import { formatIsoDateTime } from "@/util";
import { BackLink } from "../button";
import { DprApplication } from "@/types";
import { PrototypeApplication } from "odp-types/schemas/prototypeApplication";
import { ApplicationSubmission } from "../ApplicationSubmission";

export interface PageApplicationSubmissionProps {
  application: DprApplication["application"];
  submission: PrototypeApplication | null;
}

export const PageApplicationSubmission = ({
  application,
  submission,
}: PageApplicationSubmissionProps) => {
  const reference = application.reference;
  const submittedAt = submission && submission.metadata.submittedAt;
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
        {submission ? (
          <ApplicationSubmission submission={submission} />
        ) : (
          <p className="govuk-body">Submission data not available</p>
        )}
      </div>
    </>
  );
};
