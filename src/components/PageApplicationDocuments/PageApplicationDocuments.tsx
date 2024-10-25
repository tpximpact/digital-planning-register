import { BackLink } from "../button";
import ApplicationHeader from "../application_header";
import {
  ApiResponse,
  DprApplication,
  DprDocument,
  SearchParams,
} from "@/types";
import { AppConfig } from "@/config/types";
import { DocumentsList } from "@/components/DocumentsList";
import { Pagination } from "@/components/govuk/Pagination";

export interface PageApplicationDocumentsProps {
  params: {
    council: string;
    reference: string;
  };
  application: DprApplication;
  documents?: DprDocument[];
  pagination: NonNullable<ApiResponse<any>["pagination"]>;
  appConfig: AppConfig;
  searchParams?: SearchParams;
}

export const PageApplicationDocuments = ({
  params,
  application,
  documents,
  pagination,
  appConfig,
  searchParams,
}: PageApplicationDocumentsProps) => {
  if (!appConfig || !appConfig.council) {
    return null;
  }
  const { council, reference } = params;
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationHeader
          reference={reference}
          address={application.property.address.singleLine}
        />
        <DocumentsList
          documents={documents}
          resultsPerPage={appConfig.defaults.resultsPerPage}
          searchParams={searchParams}
        />
        <Pagination currentUrl="/" pagination={pagination} />
      </div>
    </>
  );
};
