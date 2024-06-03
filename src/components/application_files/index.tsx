import { ApplicationDocument, Data } from "../../../util/type";
import DocumentCard from "../document_card";
import { formatTag } from "../../../util/formatTag";

interface ApplicationFileProps extends Data {
  documents: ApplicationDocument[];
  reference: string;
  showViewAllButton?: boolean;
  maxDisplayDocuments?: number;
  council: string;
}

const ApplicationFile = ({
  documents,
  reference,
  showViewAllButton = true,
  maxDisplayDocuments,
  council,
}: ApplicationFileProps) => {
  const displayedDocuments = documents?.slice(0, maxDisplayDocuments) ?? [];

  return (
    <div className="grid-row-extra-bottom-margin documents-container">
      <h2 className="govuk-heading-l">Documents</h2>
      <p className="govuk-body documents-containers">
        To find out more detailed information, please read the following
        document(s) provided by the applicant.
      </p>
      {documents && documents.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin file-table">
            {displayedDocuments.map((document) => (
              <DocumentCard
                key={document?.numbers}
                document={document}
                formatTag={formatTag}
              />
            ))}
          </div>
          {showViewAllButton &&
            maxDisplayDocuments &&
            documents.length > maxDisplayDocuments && (
              <div className="govuk-grid-row grid-row-extra-bottom-margin">
                <div className="govuk-grid-column-full">
                  <p className="govuk-hint">
                    Showing {maxDisplayDocuments} of {documents.length}{" "}
                    documents
                  </p>
                  <a
                    href={`/${council}/${reference}/documents`}
                    role="button"
                    className="govuk-button govuk-button--secondary blue-button"
                    data-module="govuk-button"
                  >
                    Show all {documents.length} documents
                  </a>
                </div>
              </div>
            )}
        </>
      ) : (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-one-third-from-desktop">
            <p className="govuk-hint">
              <em>No documents have been published at this time.</em>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationFile;
