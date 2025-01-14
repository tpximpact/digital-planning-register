import { Metadata } from "next";
import {
  ApiResponse,
  DprShowApiResponse,
  DprDocumentsApiResponse,
  SearchParams,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
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
}: PlanningApplicationDetailsDocumentsProps): Promise<{
  applicationResponse: ApiResponse<DprShowApiResponse | null>;
  documentResponse: ApiResponse<DprDocumentsApiResponse | null>;
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
}: PlanningApplicationDetailsDocumentsProps): Promise<Metadata | undefined> {
  const { applicationResponse } = await fetchData({ params });
  const { reference, council } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";

  if (!applicationResponse.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
  return {
    title: `Documents | Application ${reference} | ${councilName} Digital Planning Register`,
    description: `All documents for ${councilName} Council planning application ${reference}`,
  };
}

export default async function PlanningApplicationDetailsDocuments({
  params,
  searchParams,
}: PlanningApplicationDetailsDocumentsProps) {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const { applicationResponse, documentResponse } = await fetchData({ params });

  if (
    !documentResponse ||
    documentResponse?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  const application = applicationResponse?.data;
  const documents = documentResponse?.data?.files;

  if (!documents || !application) {
    return (
      <PageMain>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageMain>
    );
  }

  const documentData = buildDocumentData(documents, searchParams);

  return (
    <PageApplicationDocuments
      reference={reference}
      application={application}
      documents={documentData.data}
      pagination={documentData.pagination}
      appConfig={appConfig}
      params={params}
      searchParams={searchParams}
    />
  );
}
