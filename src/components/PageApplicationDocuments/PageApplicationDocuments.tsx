import { BackButton } from "@/components/BackButton";
import ApplicationHeader from "../application_header";
import { Pagination } from "@/components/govuk/Pagination";
import {
  DprDocument,
  DprPagination,
  DprPlanningApplication,
  SearchParams,
} from "@/types";
import { AppConfig } from "@/config/types";
import { DocumentsList } from "@/components/DocumentsList";
import { PageMain } from "../PageMain";
import { createPathFromParams } from "@/lib/navigation";

export interface PageApplicationDocumentsProps {
  reference: string;
  application: DprPlanningApplication;
  documents: DprDocument[] | null;
  pagination: DprPagination;
  appConfig: AppConfig;
  params?: {
    council: string;
    reference?: string;
  };
  searchParams?: SearchParams;
}

export const PageApplicationDocuments = ({
  reference,
  application,
  documents,
  pagination,
  appConfig,
  params,
  searchParams,
}: PageApplicationDocumentsProps) => {
  if (!appConfig || !appConfig.council) {
    return null;
  }
  const councilSlug = appConfig.council.slug;
  const from = (pagination?.from ?? 1) - 1;
  const displayedDocuments = documents?.slice(
    from,
    from + (searchParams?.resultsPerPage ?? 9),
  );
  return (
    <>
      <BackButton baseUrl={`/${councilSlug}/${reference}`} />
      <PageMain>
        <ApplicationHeader
          reference={reference}
          address={application.property.address.singleLine}
        />
        <DocumentsList
          councilSlug={appConfig.council?.slug}
          reference={reference}
          documents={displayedDocuments ?? null}
          totalDocuments={documents?.length ?? displayedDocuments?.length ?? 0}
          showMoreButton={false}
        />
        {pagination && pagination.total_pages > 1 && (
          <Pagination
            baseUrl={createPathFromParams(params, "documents")}
            searchParams={searchParams}
            pagination={pagination}
          />
        )}
      </PageMain>
    </>
  );
};
