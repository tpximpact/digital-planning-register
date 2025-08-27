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
import "./Attachment.scss";
import {
  ThumbnailPdf,
  ThumbnailDocument,
  ThumbnailSpreadsheet,
  ThumbnailHtml,
  ThumbnailExternal,
  ThumbnailGeneric,
} from "./Thumbnails";
import { formatDateTimeToDprDate, formatFileSize } from "@/util";
import { Details } from "../Details";
import { mapMimeToAttachmentContentType } from "./Attachment.utils";

export type AttachmentContentType =
  | "pdf"
  | "document"
  | "spreadsheet"
  | "html"
  | "external"
  | "generic";

export interface AttachmentProps {
  title?: string;
  url?: string;
  fileName?: string;
  thumbnailUrl?: string;
  contentType?: AttachmentContentType;
  fileSize?: number;
  numberOfPages?: number;
  alternativeFormatContactEmail?: string;
  uploadedAt?: string;
  /**
   * overrides contentType
   */
  mimeType?: string;
  tagPrefix?: string;
  tags?: string[];
}

export const Attachment = ({
  title,
  url,
  fileName,
  thumbnailUrl,
  contentType,
  fileSize,
  numberOfPages,
  alternativeFormatContactEmail,
  uploadedAt,
  mimeType,
  tagPrefix,
  tags,
}: AttachmentProps) => {
  function renderIcon(contentType?: AttachmentContentType): JSX.Element {
    switch (contentType) {
      case "pdf":
        return <ThumbnailPdf />;
      case "document":
        return <ThumbnailDocument />;
      case "spreadsheet":
        return <ThumbnailSpreadsheet />;
      case "html":
        return <ThumbnailHtml />;
      case "external":
        return <ThumbnailExternal />;
      case "generic":
      default:
        return <ThumbnailGeneric />;
    }
  }

  if (!contentType) {
    contentType = "generic";
  }

  if (mimeType) {
    const type = mapMimeToAttachmentContentType(mimeType);
    contentType = type;
  }

  const formattedFileSize =
    fileSize != null && fileSize > 0 ? formatFileSize(fileSize) : undefined;

  const metadataSegments: string[] = [];
  if (contentType) {
    metadataSegments.push(contentType.toUpperCase());
  }
  if (formattedFileSize) {
    metadataSegments.push(formattedFileSize);
  }
  if (uploadedAt) {
    const formattedCreatedDate = formatDateTimeToDprDate(uploadedAt);
    metadataSegments.push(`uploaded ${formattedCreatedDate}`);
  }
  if (numberOfPages && numberOfPages > 0) {
    metadataSegments.push(
      `${numberOfPages} ${numberOfPages === 1 ? "page" : "pages"}`,
    );
  }
  const metadataLine = metadataSegments.join(", ");

  const thumbnailOrIcon = thumbnailUrl ? (
    <Image
      src={thumbnailUrl}
      alt={`${title || fileName || "Attachment"} thumbnail`}
      width={99}
      height={140}
      className="dpr-attachment__thumbnail-image"
    />
  ) : (
    renderIcon(contentType)
  );

  return (
    <section className="dpr-attachment">
      <div className="dpr-attachment__thumbnail">
        <a href={url} aria-hidden={true} tabIndex={-1}>
          {thumbnailOrIcon}
        </a>
      </div>
      <div className="dpr-attachment__details">
        <div className="dpr-attachment__title">
          <a className="govuk-link govuk-link--no-visited-state" href={url}>
            {title || fileName || "Untitled Document"}
          </a>
        </div>

        {tags && tags.length > 0 && (
          <p className="dpr-attachment__metadata">
            {tagPrefix && `${tagPrefix}: `}
            {tags.join(", ")}
          </p>
        )}
        {metadataLine && (
          <p className="dpr-attachment__metadata">{metadataLine}</p>
        )}
        <p className="dpr-attachment__metadata">
          This file may not be suitable for users of assistive technology.
        </p>
        {alternativeFormatContactEmail && (
          <Details
            summaryText="Request an accessible format."
            text={
              <>
                <p className="govuk-body">
                  If you use assistive technology (such as a screen reader) and
                  need a version of this document in a more accessible format,
                  please email{" "}
                  <a
                    href={`mailto:${alternativeFormatContactEmail}`}
                    className="govuk-link"
                    aria-label={`Request an accessible format for ${title || fileName || "this file"}`}
                  >
                    {alternativeFormatContactEmail}
                  </a>
                  . Please tell us what format you need. It will help us if you
                  say what assistive technology you use.
                </p>
              </>
            }
          />
        )}
      </div>
    </section>
  );
};

export default Attachment;
