import { BackLink } from "../govuk/BackLink";
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
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationHeader
          reference={reference}
          address={application.property.address.singleLine}
        />
        <DocumentsList
          councilSlug={appConfig.council?.slug}
          reference={reference}
          documents={documents ?? null}
          from={pagination.from - 1}
          maxDisplayDocuments={appConfig.defaults.resultsPerPage}
          page={pagination.page - 1}
        />
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
      </div>
    </>
  );
};
