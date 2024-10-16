import { capitaliseWord } from "../../../../../util/capitaliseWord";
import { ApiResponse, DprApplicationSubmission } from "@/types";
import NotFound from "@/app/not-found";
import { Metadata } from "next";
import { BackLink } from "@/components/button";
import ApplicationForm from "@/components/application_form";
import { formatDprDateTime } from "../../../../../util/formatDates";
import { ApiV1 } from "@/actions/api";
import { getCouncilDataSource } from "@/lib/config";
import config from "../../../../../util/config.json";
import { Config } from "@/types";
import { getCouncilConfig } from "@/lib/config";

interface ApplicationFormProps {
  params: {
    council: string;
    reference: string;
  };
}

async function fetchData({
  params,
}: ApplicationFormProps): Promise<
  ApiResponse<DprApplicationSubmission | null>
> {
  const { reference, council } = params;
  const response = await ApiV1.applicationSubmission(
    getCouncilDataSource(council),
    council,
    reference,
  );

  return response;
}

export async function generateMetadata({
  params,
}: ApplicationFormProps): Promise<Metadata> {
  const response = await fetchData({ params });

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: `Application ${response?.data?.application?.reference}`,
    description: `${capitaliseWord(params.council)} planning application`,
  };
}

export default async function ApplicationFormPage({
  params,
}: ApplicationFormProps) {
  const response = await fetchData({ params });
  const { reference, council } = params;
  const councilConfig = getCouncilConfig(council);

  if (!response.data || councilConfig?.visibility === "private") {
    return <NotFound params={params} />;
  }

  const submittedAt = response?.data?.submission?.metadata.submittedAt;
  const applicationSubmissionData = response?.data?.submission?.data;

  return (
    <div className="govuk-main-wrapper">
      <BackLink />
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
              formatDprDateTime(submittedAt)
            ) : (
              <p className="govuk-body">Date not available</p>
            )}
          </div>
        </div>
      </div>
      {applicationSubmissionData ? (
        <ApplicationForm submissionData={applicationSubmissionData} />
      ) : (
        <p className="govuk-body">Submission data not available</p>
      )}
    </div>
  );
}
