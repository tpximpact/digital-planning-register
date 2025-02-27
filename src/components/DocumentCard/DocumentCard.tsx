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

import Image from "next/image";
import file from "./file-icon--default.svg";
import { DprDocument } from "@/types";
import { formatDateTimeToDmyDate, formatFileSize } from "@/util";
import "./DocumentCard.scss";

export interface DocumentCardProps {
  document: DprDocument;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  return (
    <div className="dpr-document-card">
      <div className="dpr-document-card__image">
        <Image
          src={file}
          alt="Document"
          width={130}
          height={160}
          className="file-icon"
          role="img"
        />
      </div>
      <div className="dpr-document-card__data">
        <p className="govuk-body document-title-link">
          <a
            href={document?.url}
            className="govuk-link govuk-link--no-visited-state"
          >
            {document?.title}
          </a>
        </p>
        <p className="govuk-hint">
          {document?.metadata?.contentType && (
            <span className="dpr-document-card__file-type">
              {document?.metadata?.contentType !== "text/html"
                ? document.metadata.contentType
                    ?.split("/")
                    .pop()
                    ?.toUpperCase() + ", "
                : document.metadata.contentType.toUpperCase()}
            </span>
          )}
          {document?.metadata?.byteSize && (
            <>
              <span className="dpr-document-card__size">
                {formatFileSize(document.metadata.byteSize)}
              </span>
              ,{" "}
            </>
          )}

          {document?.createdDate && (
            <>
              uploaded{" "}
              <time dateTime={document.createdDate}>
                {formatDateTimeToDmyDate(document.createdDate)}
              </time>
            </>
          )}
        </p>
        <p className="govuk-hint">
          {document?.metadata?.contentType !== "text/html" &&
            "This file may not be suitable for users of assistive technology."}
        </p>
      </div>
    </div>
  );
};

export default DocumentCard;
