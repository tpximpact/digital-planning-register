import { capitaliseWord } from "../../../../../util/capitaliseWord";
import { ApiResponse, V2PlanningApplicationsSubmission } from "@/types";
import NotFound from "@/app/not-found";
import { Metadata } from "next";
import { BackLink } from "@/components/button";
import ApplicationForm from "@/components/application_form";
import { format } from "date-fns";
import { getApplicationSubmission } from "@/actions";

interface PageParams {
  council: string;
  reference: string;
}

interface ApplicationFormProps {
  params: PageParams;
}

async function fetchData(
  params: PageParams,
): Promise<ApiResponse<V2PlanningApplicationsSubmission | null>> {
  const { reference, council } = params;
  const response = await getApplicationSubmission(reference, council);
  return response;
}

export async function generateMetadata({
  params,
}: ApplicationFormProps): Promise<Metadata> {
  const response = await fetchData(params);

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: `Application ${response.data.application.reference}`,
    description: `${capitaliseWord(params.council)} planning application`,
  };
}

export default async function ApplicationFormPage({
  params,
}: ApplicationFormProps) {
  const response = await fetchData(params);
  const { reference, council } = params;

  if (!response.data) {
    return <NotFound params={params} />;
  }

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
          <p>
            {/* @todo date format should be 2 May 2024 at 3:14pm */}
            {response?.data?.submission?.metadata.submittedAt
              ? format(
                  new Date(response.data.submission.metadata.submittedAt),
                  "dd MMM yyyy hh:mm aa",
                )
              : "Date not available"}
          </p>
        </div>
      </div>
      <ApplicationForm {...response.data} />
    </div>
  );
}
