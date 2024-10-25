import { Metadata } from "next";
import {
  ApiResponse,
  SearchParams,
  DprDocument,
  DprApplication,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { ContentNotFound } from "@/components/ContentNotFound";
import { buildDocumentData } from "@/lib/documents";
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
  searchParams,
}: PlanningApplicationDetailsDocumentsProps): Promise<{
  applicationResponse: ApiResponse<DprApplication | undefined>;
  documentResponse: ApiResponse<DprDocument[] | undefined>;
}> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const [applicationResponse, documentResponse] = await Promise.all([
    ApiV1.show(appConfig.council?.dataSource ?? "none", council, reference),
    ApiV1.documents(
      appConfig.council?.dataSource ?? "none",
      council,
      reference,
      searchParams,
    ),
  ]);
  return { applicationResponse, documentResponse };
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
  const { applicationResponse, documentResponse } = await fetchData({
    params,
    searchParams,
  });

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
  const documents = documentResponse?.data;

  if (!application) {
    return (
      <PageWrapper>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageWrapper>
    );
  }

  const documentData = buildDocumentData(documents, searchParams);

  return (
    <PageApplicationDocuments
      params={params}
      searchParams={searchParams}
      application={application}
      documents={documents}
      pagination={documentResponse.pagination}
      appConfig={appConfig}
    />
  );
}
