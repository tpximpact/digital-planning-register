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

import { Button } from "@/components/button";
import { FileList } from "@/components/FileList";

import "./DocumentsList.scss";

import type { DprDocument } from "@/types";

export interface DocumentsListProps {
  councilSlug: string;
  reference: string;
  documents: DprDocument[] | null;
  totalDocuments: number;
  documentsToShow: number;
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
  documentsToShow = 6,
}: DocumentsListProps) => {
  const documentsToDisplay = documents?.slice(0, documentsToShow) || null;
  return (
    <section className="dpr-documents-list" aria-labelledby="documents">
      <h2 className="govuk-heading-l" id="documents">
        Documents
      </h2>

      {documentsToDisplay && documentsToDisplay.length > 0 ? (
        <>
          <p className="govuk-body">
            To find out more detailed information, please read the following
            document(s) provided by the applicant.
          </p>
          <FileList documents={documentsToDisplay} />
          {documentsToDisplay.length < totalDocuments && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {documentsToDisplay.length} of {totalDocuments}{" "}
                  documents
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

export const DocumentsListSkeleton = () => {
  return (
    <section className="dpr-documents-list" aria-labelledby="documents">
      <h2 className="govuk-heading-l" id="documents">
        Documents
      </h2>
      <div className="dpr-documents-list__skeleton"></div>
    </section>
  );
};
