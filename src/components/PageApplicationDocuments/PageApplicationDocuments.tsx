import { BackLink } from "../button";
import ApplicationHeader from "../application_header";
import { Pagination } from "@/components/govuk/Pagination";
import { createPathFromParams } from "@/lib/navigation";
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
          baseUrl={createPathFromParams(params, "documents")}
          searchParams={searchParams}
          pagination={pagination}
        />
      </div>
    </>
  );
};
