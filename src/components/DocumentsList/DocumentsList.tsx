import { DprDocument, SearchParams } from "@/types";
import { DocumentCard } from "@/components/document_card";
import "./DocumentsList.scss";
import { search } from "@/handlers/bops/v2";
import Link from "next/link";

interface DocumentsListProps {
  documents?: DprDocument[];
  resultsPerPage?: number;
  showMoreButton?: boolean;
  searchParams?: SearchParams;
}

export const DocumentsList = ({
  documents,
  resultsPerPage = 10,
  searchParams,
  showMoreButton = false,
}: DocumentsListProps) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="dpr-documents govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-two-thirds">
          <p className="govuk-hint">
            <em>No documents have been published at this time.</em>
          </p>
        </div>
      </div>
    );
  }

  const from = 0;
  const to = from + resultsPerPage;
  const displayedDocuments = documents?.slice(from, to);
  const totalDocuments = documents ? documents.length : 0;

  return (
    <div className="dpr-documents grid-row-extra-bottom-margin">
      <h1 className="govuk-heading-l">Documents</h1>
      <p className="govuk-body">
        To find out more detailed information, please read the following
        document(s) provided by the applicant.
      </p>

      {displayedDocuments && (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin dpr-documents__file-table">
            {displayedDocuments.map((document, i) => (
              <DocumentCard key={i} document={document} />
            ))}
          </div>

          {showMoreButton && totalDocuments > resultsPerPage && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {resultsPerPage} of {totalDocuments} documents
                </p>
                <Link
                  href="documents"
                  role="button"
                  className="govuk-button govuk-button--secondary blue-button"
                  data-module="govuk-button"
                >
                  Show all {totalDocuments} documents
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
