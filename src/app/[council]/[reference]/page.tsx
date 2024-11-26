import { Metadata } from "next";
import {
  ApiResponse,
  DprShowApiResponse,
  DprDocumentsApiResponse,
  DprApplicationSubmissionApiResponse,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { PageShow } from "@/components/PageShow";
import { applicationFormObject } from "@/lib/documents";

interface PlanningApplicationDetailsProps {
  params: {
    council: string;
    reference: string;
  };
}

async function fetchData({ params }: PlanningApplicationDetailsProps): Promise<{
  applicationResponse: ApiResponse<DprShowApiResponse | null>;
  documentResponse: ApiResponse<DprDocumentsApiResponse | null>;
  applicationSubmissionResponse: ApiResponse<DprApplicationSubmissionApiResponse | null>;
}> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const [applicationResponse, documentResponse, applicationSubmissionResponse] =
    await Promise.all([
      ApiV1.show(appConfig.council?.dataSource ?? "none", council, reference),
      ApiV1.documents(
        appConfig.council?.dataSource ?? "none",
        council,
        reference,
      ),
      ApiV1.applicationSubmission(
        appConfig.council?.dataSource ?? "none",
        council,
        reference,
      ),
    ]);
  return {
    applicationResponse,
    documentResponse,
    applicationSubmissionResponse,
  };
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
  const {
    applicationResponse,
    documentResponse,
    applicationSubmissionResponse,
  } = await fetchData({ params });
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
  let documents = appConfig.features.documentsPublicEndpoint
    ? (documentResponse?.data?.files ?? null)
    : (application?.application.documents ?? null);

  if (applicationSubmissionResponse.data?.submission) {
    const applicationForm = applicationFormObject(council, reference);
    documents = documents ? [applicationForm, ...documents] : [applicationForm];
  }

  return (
    <PageShow
      appConfig={appConfig}
      application={application}
      documents={documents}
      params={params}
    />
  );
};

export default PlanningApplicationDetails;
