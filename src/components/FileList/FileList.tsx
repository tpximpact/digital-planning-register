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

import { DocumentCard } from "@/components/DocumentCard";

import type { DprDocument } from "@/types";

import "./FileList.scss";

export interface FileListProps {
  documents: DprDocument[] | null;
}

/**
 * Similar to ApplicationCard on the search page we leave whats displayed up to the parent component
 * @param param0
 * @returns
 */
export const FileList = ({ documents }: FileListProps) => {
  if (!documents) {
    return null;
  }
  return (
    <section className="dpr-file-list">
      {documents && documents.length > 0 && (
        <>
          <div className="dpr-file-list__cards">
            {documents.map((document, i) => (
              <DocumentCard key={i} document={document} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
