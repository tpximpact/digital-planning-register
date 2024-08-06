import { getApplicationByReference } from "../../../actions/index";
import { BackLink } from "@/components/button";
import ApplicationInformation from "@/components/application_information";
import ApplicationFile from "@/components/application_files";
import ApplicationPeople from "@/components/application_people";
import ApplicationComments from "@/components/application_comments";
import { Config, ApiResponse, DprApplicationDetails } from "@/types";
import { capitaliseWord } from "../../../../util/capitaliseWord";
import NotFound from "@/app/not-found";
import config from "../../../../util/config.json";
import { Metadata } from "next";
import { ApplicationFormObject } from "@/components/application_form";

interface PageParams {
  council: string;
  reference: string;
}

interface ApplicationProps {
  params: PageParams;
}

async function fetchData(
  params: PageParams,
): Promise<ApiResponse<DprApplicationDetails | null>> {
  const { reference, council } = params;
  const response = await getApplicationByReference(reference, council);
  return response;
}

export async function generateMetadata({
  params,
}: ApplicationProps): Promise<Metadata> {
  const response = await fetchData(params);

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: `Application ${response.data.reference}`,
    description: `${capitaliseWord(params.council)} planning application`,
  };
}

export default async function Application({ params }: ApplicationProps) {
  const response = await fetchData(params);
  const { reference, council } = params;

  if (!response.data) {
    return <NotFound params={params} />;
  }

  const councilConfig: Config = config;

  const publicComments = councilConfig[council]?.publicComments;
  const specialistComments = councilConfig[council]?.specialistComments;

  // add fake application form document
  const applicationFormDocument = ApplicationFormObject(council, reference);
  const documents = applicationFormDocument
    ? [applicationFormDocument, ...response.data.documents]
    : response.data.documents;

  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationInformation
          {...response.data}
          reference={reference}
          council={council}
        />
        {/* <ApplicationLocation /> */}
        {/* <ApplicationDetails {...response.data} /> */}
        <ApplicationFile
          documents={documents}
          reference={reference}
          maxDisplayDocuments={6}
          council={council}
        />
        <ApplicationPeople {...response.data} />
        {specialistComments && (
          <ApplicationComments
            council={council}
            reference={reference}
            maxDisplayComments={3}
            showViewAllButton={true}
            type="consultee"
            comments={response.data?.consultee_comments}
            currentPage={0}
            totalComments={response.data?.consultee_comments?.length}
          />
        )}
        {publicComments && (
          <ApplicationComments
            council={council}
            reference={reference}
            maxDisplayComments={3}
            showViewAllButton={true}
            type="published"
            comments={response.data?.published_comments}
            currentPage={0}
            totalComments={response.data?.published_comments?.length}
          />
        )}
        {/* <ApplicationConstraints /> */}
      </div>
    </>
  );
}
