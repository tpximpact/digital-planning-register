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

import { FileList } from "@/components/FileList";

import type { DprDocument } from "@/types";

export interface AppealsListProps {
  appealReason?: string;
  appealDocuments?: DprDocument[];
}

export const ApplicationAppeals = ({
  appealReason,
  appealDocuments,
}: AppealsListProps) => {
  if (!appealReason && !appealDocuments) {
    return null;
  }
  return (
    <section className="dpr-documents-list" aria-labelledby="appeal">
      <h2 className="govuk-heading-l" id="appeal">
        Appeal
      </h2>
      {appealReason && (
        <>
          <h3 className="govuk-heading-m">Appeal reason</h3>
          <p className="govuk-body">{appealReason}</p>
        </>
      )}{" "}
      {appealDocuments && (
        <>
          <h3 className="govuk-heading-m">Appeal documents</h3>
          <FileList documents={appealDocuments} />
        </>
      )}
    </section>
  );
};
