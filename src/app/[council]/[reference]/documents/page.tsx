import { Metadata } from "next";
import {
  ApiResponse,
  DprDocument,
  DprPagination,
  DprPublicApplicationDetails,
  DprPublicApplicationDocuments,
} from "@/types";
import NotFound from "@/app/not-found";
import { capitaliseWord } from "../../../../../util/capitaliseWord";
import { BackLink } from "@/components/button";
import ApplicationHeader from "@/components/application_header";
import Pagination from "@/components/pagination";
import { createItemPagination } from "@/lib/pagination";
import DocumentsList from "@/components/documents_list";
import { getCouncilDataSource, siteConfig } from "@/lib/config";
import { ApiV1 } from "@/actions/api";

interface CommentSearchParams {
  page?: string;
}

interface PlanningApplicationDetailsDocumentsProps {
  params: PageParams;
  searchParams?: CommentSearchParams | undefined;
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
}: PlanningApplicationDetailsDocumentsProps): Promise<Metadata> {
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

export default async function PlanningApplicationDetailsDocuments({
  params,
  searchParams,
}: PlanningApplicationDetailsDocumentsProps) {
  const { applicationResponse, documentResponse } = await fetchData(params);
  const { reference, council } = params;

  if (!applicationResponse.data) {
    return <NotFound params={params} />;
  }

  /**
   * If the application is not found, return a 404 page
   * Also, if none of the comment types from config are allowed also show not found
   */
  if (!applicationResponse.data) {
    return <NotFound params={params} />;
  }

  const application = applicationResponse.data;
  const documents = siteConfig.documentsPublicEndpoint
    ? documentResponse?.data?.files
    : application.application.documents;

  const totalDocuments = documents ? documents.length : 0;
  const currentPage = Number(searchParams?.page ?? 1);
  const maxDisplayDocuments = 10;

  const documentData: { pagination: DprPagination; data: DprDocument[] } = {
    pagination: {
      ...createItemPagination(totalDocuments, currentPage, maxDisplayDocuments),
    },
    data: documents ? [...documents] : [],
  };

  return (
    <div>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationHeader
          reference={reference}
          address={application.property.address.singleLine}
        />
        <DocumentsList
          council={council}
          reference={reference}
          documents={documentData.data ?? null}
          from={documentData.pagination.from - 1}
          maxDisplayDocuments={maxDisplayDocuments}
          page={documentData.pagination.page - 1}
        />
        <Pagination
          currentPage={documentData.pagination.page - 1}
          totalItems={documentData.pagination.total_results}
          itemsPerPage={maxDisplayDocuments}
          baseUrl={`/${council}/${reference}/documents`}
          queryParams={searchParams}
          totalPages={documentData.pagination.total_pages}
        />
      </div>
    </div>
  );
}
