import Image from "next/image";
import { DprDocument } from "@/types";
import { formatFileSize } from "@/util";
import "./DocumentCard.scss";

export interface DocumentCardProps {
  document: DprDocument;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  console.log(document.metadata.contentType);
  return (
    <div className="dpr-document-card">
      <div className="dpr-document-card__image" aria-hidden="true"></div>
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
            <>
              {document?.metadata?.contentType !== "text/html"
                ? document.metadata.contentType
                    ?.split("/")
                    .pop()
                    ?.toUpperCase() + ", "
                : document.metadata.contentType.toUpperCase()}
            </>
          )}
          {document?.metadata?.byteSize && (
            <>{formatFileSize(document.metadata.byteSize)}, </>
          )}

          {document?.created_at && (
            <>
              uploaded{" "}
              {new Date(document.created_at).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
