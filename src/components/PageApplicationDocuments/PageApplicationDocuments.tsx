import { BackButton } from "@/components/BackButton";
import ApplicationHeader from "../application_header";
import { Pagination } from "../Pagination";
import {
  DprDocument,
  DprPagination,
  DprPlanningApplication,
  SearchParams,
} from "@/types";
import { AppConfig } from "@/config/types";
import { DocumentsList } from "@/components/DocumentsList";
import { PageMain } from "../PageMain";

export interface PageApplicationDocumentsProps {
  reference: string;
  application: DprPlanningApplication;
  documents: DprDocument[] | null;
  pagination: DprPagination;
  appConfig: AppConfig;
  searchParams?: SearchParams;
}

export const PageApplicationDocuments = ({
  reference,
  application,
  documents,
  pagination,
  appConfig,
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
        {pagination && (
          <Pagination
            currentPage={pagination.page - 1}
            totalItems={
              pagination.total_pages * appConfig.defaults.resultsPerPage
            }
            itemsPerPage={appConfig.defaults.resultsPerPage}
            baseUrl={
              appConfig?.council?.slug
                ? `/${appConfig.council.slug}/${reference}/documents`
                : ""
            }
            queryParams={searchParams}
            totalPages={pagination.total_pages}
          />
        )}
      </PageMain>
    </>
  );
};
