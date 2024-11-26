import { Metadata } from "next";
import {
  ApiResponse,
  DprShowApiResponse,
  DprDocumentsApiResponse,
  SearchParams,
  DprApplicationSubmissionApiResponse,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { ContentNotFound } from "@/components/ContentNotFound";
import { applicationFormObject, buildDocumentData } from "@/lib/documents";
import { PageApplicationDocuments } from "@/components/PageApplicationDocuments";

interface PlanningApplicationDetailsDocumentsProps {
  params: {
    council: string;
    reference: string;
  };
  searchParams?: SearchParams;
}

async function fetchData({
  params,
}: PlanningApplicationDetailsDocumentsProps): Promise<{
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
}: PlanningApplicationDetailsDocumentsProps): Promise<Metadata | undefined> {
  const { applicationResponse } = await fetchData({ params });

  if (!applicationResponse.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
}

export default async function PlanningApplicationDetailsDocuments({
  params,
  searchParams,
}: PlanningApplicationDetailsDocumentsProps) {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const {
    applicationResponse,
    documentResponse,
    applicationSubmissionResponse,
  } = await fetchData({ params });

  if (
    !documentResponse ||
    documentResponse?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    return (
      <PageWrapper>
        <ContentError />
      </PageWrapper>
    );
  }

  const application = applicationResponse?.data;
  let documents = appConfig.features.documentsPublicEndpoint
    ? documentResponse?.data?.files
    : application?.application.documents;

  if (!documents || !application) {
    return (
      <PageWrapper>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageWrapper>
    );
  }

  if (applicationSubmissionResponse.data?.submission) {
    const applicationForm = applicationFormObject(council, reference);
    documents = documents ? [applicationForm, ...documents] : [applicationForm];
  }

  const documentData = buildDocumentData(documents, searchParams);

  return (
    <PageApplicationDocuments
      reference={reference}
      application={application}
      documents={documentData.data}
      pagination={documentData.pagination}
      appConfig={appConfig}
      searchParams={searchParams}
    />
  );
}
