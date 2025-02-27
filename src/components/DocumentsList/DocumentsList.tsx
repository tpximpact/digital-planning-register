/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { DprDocument } from "@/types";
import { DocumentCard } from "@/components/DocumentCard";
import "./DocumentsList.scss";
import { Button } from "@/components/button";

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
    <section className="dpr-documents-list" aria-labelledby="documents">
      <h2 className="govuk-heading-l" id="documents">
        Documents
      </h2>
      <p className="govuk-body">
        To find out more detailed information, please read the following
        document(s) provided by the applicant.
      </p>

      {documents && documents.length > 0 ? (
        <>
          <div className="dpr-documents-list__cards">
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
                    <Button
                      variant="information"
                      element="link"
                      href={`/${councilSlug}/${reference}/documents`}
                    >
                      {`Show all ${totalDocuments} documents`}
                    </Button>
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
