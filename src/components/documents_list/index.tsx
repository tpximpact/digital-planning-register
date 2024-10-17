import {
  DprComment,
  DprCommentTypes,
  DprDocument,
  DprPagination,
} from "@/types";
import DocumentCard from "../document_card";

interface DocumentsListProps {
  councilSlug?: string;
  reference: string;
  documents: DprDocument[] | null;
  maxDisplayDocuments?: number;
  from?: number;
  showMoreButton?: boolean;
  pagination?: DprPagination;
  page?: number;
}

export const DocumentsList = ({
  councilSlug,
  reference,
  documents,
  maxDisplayDocuments = 3,
  from = 0,
  showMoreButton = false,
  page = 0,
}: DocumentsListProps) => {
  const displayedDocuments = documents?.slice(from, from + maxDisplayDocuments);
  const totalDocuments = documents ? documents.length : 0;

  return (
    <div className="grid-row-extra-bottom-margin documents-container">
      <h1 className="govuk-heading-l">Documents</h1>
      <p className="govuk-body documents-containers">
        To find out more detailed information, please read the following
        document(s) provided by the applicant.
      </p>

      {displayedDocuments && displayedDocuments.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin file-table">
            {displayedDocuments.map((document, i) => (
              <DocumentCard key={i} document={document} />
            ))}
          </div>
          {showMoreButton && totalDocuments > maxDisplayDocuments && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {maxDisplayDocuments} of {totalDocuments} documents
                </p>
                {councilSlug && (
                  <a
                    href={`/${councilSlug}/${reference}/documents`}
                    role="button"
                    className="govuk-button govuk-button--secondary blue-button"
                    data-module="govuk-button"
                  >
                    Show all {totalDocuments} documents
                  </a>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-hint">
              <em>No documents have been published at this time.</em>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsList;
