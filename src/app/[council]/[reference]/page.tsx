import { Metadata } from "next";
import { capitaliseWord } from "../../../../util/capitaliseWord";
import {
  ApiResponse,
  DprPublicApplicationDetails,
  DprPublicApplicationDocuments,
} from "@/types";
import { BackLink } from "@/components/button";
import NotFound from "@/app/not-found";
import {
  getCouncilConfig,
  getCouncilDataSource,
  siteConfig,
} from "@/lib/config";
import ApplicationInformation from "@/components/application_information";
import CommentsList from "@/components/comments_list";
import ApplicationPeople from "@/components/application_people";
import DocumentsList from "@/components/documents_list";
import { ApiV1 } from "@/api";

interface PlanningApplicationDetailsProps {
  params: PageParams;
}

interface PageParams {
  council: string;
  reference: string;
}

async function fetchData(params: PageParams): Promise<{
  applicationResponse: ApiResponse<DprPublicApplicationDetails | null>;
  documentResponse: ApiResponse<DprPublicApplicationDocuments | null>;
}> {
  const { reference, council } = params;
  const [applicationResponse, documentResponse] = await Promise.all([
    ApiV1.show(getCouncilDataSource(council), council, reference),
    ApiV1.documents(getCouncilDataSource(council), council, reference),
  ]);
  return { applicationResponse, documentResponse };
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsProps): Promise<Metadata> {
  const { applicationResponse } = await fetchData(params);

  if (!applicationResponse.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: `Application ${applicationResponse.data.application.reference}`,
    description: `${capitaliseWord(params.council)} planning application`,
  };
}

export default async function PlanningApplicationDetails({
  params,
}: PlanningApplicationDetailsProps) {
  const { applicationResponse, documentResponse } = await fetchData(params);
  const { reference, council } = params;

  if (!applicationResponse.data) {
    return <NotFound params={params} />;
  }

  const application = applicationResponse.data;

  const councilConfig = getCouncilConfig(council);

  const documents = siteConfig.documentsPublicEndpoint
    ? documentResponse?.data?.files
    : application.application.documents;

  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        {/* <ApplicationCard council={council} {...application} /> */}
        <ApplicationInformation council={council} {...application} />
        {/* <ApplicationLocation /> */}
        {/* <ApplicationDetails {...application} /> */}
        <DocumentsList
          council={council}
          reference={reference}
          showMoreButton={true}
          documents={documents ?? null}
        />
        <ApplicationPeople
          applicant_first_name={application.application.applicant_first_name}
          applicant_last_name={application.application.applicant_last_name}
          agent_first_name={application.application.agent_first_name}
          agent_last_name={application.application.agent_last_name}
        />
        {councilConfig?.specialistComments && (
          <CommentsList
            council={council}
            reference={reference}
            type="consultee"
            showMoreButton={true}
            comments={application.application.consultation.consulteeComments}
          />
        )}
        {councilConfig?.publicComments && (
          <CommentsList
            council={council}
            reference={reference}
            type="published"
            showMoreButton={true}
            comments={application.application.consultation.publishedComments}
          />
        )}
        {/* <ApplicationConstraints /> */}
      </div>
    </>
  );
}
