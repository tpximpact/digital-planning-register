import { DprDocument } from "@/types";
import { DocumentCard } from "@/components/DocumentCard";
import "./DocumentsList.scss";
import Link from "next/link";
import { LinkButton } from "../button";

export interface DocumentsListProps {
  councilSlug: string;
  reference: string;
  documents: DprDocument[] | null;
  totalDocuments: number;
  showMoreButton?: boolean;
}

/**
 * Similar to ApplicationCard on the search page we leave whats displayed up to the parent component
 * @param param0
 * @returns
 */
export const DocumentsList = ({
  councilSlug,
  reference,
  documents,
  totalDocuments,
  showMoreButton = false,
}: DocumentsListProps) => {
  return (
    <section
      className="grid-row-extra-bottom-margin documents-container"
      aria-labelledby="documents-section"
    >
      <h2 className="govuk-heading-l" id="documents-section">
        Documents
      </h2>
      <p className="govuk-body documents-containers">
        To find out more detailed information, please read the following
        document(s) provided by the applicant.
      </p>

      {documents && documents.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin file-table">
            {documents.map((document, i) => (
              <DocumentCard key={i} document={document} />
            ))}
          </div>
          {showMoreButton &&
            documents.length > 0 &&
            documents.length < totalDocuments && (
              <div className="govuk-grid-row grid-row-extra-bottom-margin">
                <div className="govuk-grid-column-full">
                  <p className="govuk-hint">
                    Showing {documents.length} of {totalDocuments} documents
                  </p>
                  {councilSlug && (
                    <LinkButton
                      href={`/${councilSlug}/${reference}/documents`}
                      text={`Show all ${totalDocuments} documents`}
                    />
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
    </section>
  );
};
