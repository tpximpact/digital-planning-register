import { ApplicationDocument, Data } from "../../../util/type";
import DocumentCard from "../document_card";
import { formatTag } from "../../../util/formatTag";

interface ApplicationFileProps extends Data {
  documents: ApplicationDocument[];
  id: string;
  showViewAllButton?: boolean;
  documentsLimit?: number;
}

const ApplicationFile = ({
  documents,
  id,
  showViewAllButton = true,
  documentsLimit,
}: ApplicationFileProps) => {
  const displayedDocuments = documentsLimit
    ? documents?.slice(0, documentsLimit) ?? []
    : documents ?? [];

  return (
    <>
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
            documentsLimit &&
            documents.length > documentsLimit && (
              <div className="govuk-grid-row grid-row-extra-bottom-margin">
                <div className="govuk-grid-column-full">
                  <p className="govuk-hint">
                    Showing 6 of {documents.length} documents
                  </p>
                  <a
                    href={`/${id}/documents`}
                    role="button"
                    className="govuk-button govuk-button--primary"
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
    </>
  );
};

export default ApplicationFile;
