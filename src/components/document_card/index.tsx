import Image from "next/image";
import file from "../../../public/images/file-icon-default.svg";
import { DprDocument } from "@/types";

interface DocumentCardProps {
  document: DprDocument;
  formatTag: (tag: string) => string;
}

export const DocumentCard = ({ document, formatTag }: DocumentCardProps) => {
  return (
    <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
      <div className="govuk-grid-column-one-third">
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
      <div className="govuk-grid-column-two-thirds">
        <p className="govuk-body">
          <a
            href={document?.url}
            className="govuk-link govuk-link--no-visited-state"
          >
            {document?.title}
          </a>
        </p>
        {document?.created_at && (
          <p className="govuk-hint">
            uploaded{" "}
            {new Date(document?.created_at).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        {document?.metadata?.contentType !== "text/html" && (
          <p className="govuk-hint">
            This file may not be suitable for users of assistive technology.
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
