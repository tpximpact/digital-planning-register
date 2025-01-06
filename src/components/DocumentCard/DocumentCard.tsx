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
      <div className="dpr-document-card__image" aria-hidden="true">
        <Image
          src={file}
          alt="Document"
          width={130}
          height={160}
          className="file-icon"
          aria-label="Document"
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
