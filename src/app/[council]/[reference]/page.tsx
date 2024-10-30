import { Metadata } from "next";
import { ApiResponse, DprShow, DprDocuments } from "@/types";
import { BackLink } from "@/components/govuk/BackLink";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { ContentNotFound } from "@/components/ContentNotFound";
import { ApplicationDetails } from "@/components/ApplicationDetails";

interface PlanningApplicationDetailsProps {
  params: {
    council: string;
    reference: string;
  };
}

async function fetchData({ params }: PlanningApplicationDetailsProps): Promise<{
  applicationResponse: ApiResponse<DprShow | null>;
  documentResponse: ApiResponse<DprDocuments | null>;
}> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const [applicationResponse, documentResponse] = await Promise.all([
    ApiV1.show(appConfig.council?.dataSource ?? "none", council, reference),
    ApiV1.documents(
      appConfig.council?.dataSource ?? "none",
      council,
      reference,
    ),
  ]);
  return { applicationResponse, documentResponse };
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsProps): Promise<Metadata | undefined> {
  const { applicationResponse } = await fetchData({ params });
  const appConfig = getAppConfig(params.council);

  if (!applicationResponse.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
}

const PlanningApplicationDetails = async ({
  params,
}: PlanningApplicationDetailsProps) => {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const { applicationResponse, documentResponse } = await fetchData({ params });
  if (
    !applicationResponse ||
    applicationResponse?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    return (
      <PageWrapper>
        <ContentError />
      </PageWrapper>
    );
  }
  const application = applicationResponse.data;
  if (!application) {
    return (
      <PageWrapper>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageWrapper>
    );
  }
  const documents = appConfig.features.documentsPublicEndpoint
    ? documentResponse?.data?.files
    : application.application.documents;
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationDetails
          reference={reference}
          application={application}
          documents={documents}
          appConfig={appConfig}
        />
      </div>
    </>
  );
};

export default PlanningApplicationDetails;
