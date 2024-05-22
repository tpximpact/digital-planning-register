import Image from "next/image";
import file from "../../../public/images/file-icon-default.svg";

export const DocumentCard = ({
  document,
  formatTag,
}: {
  document: any;
  formatTag: (tag: any) => string;
}) => {
  return (
    <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
      <div className="govuk-grid-column-one-third">
        <Image
          src={file}
          alt="File"
          width={130}
          height={160}
          className="file-icon"
        />
      </div>
      <div className="govuk-grid-column-two-thirds">
        <p className="govuk-body">
          <a
            href={document?.url}
            className="govuk-link govuk-link--no-visited-state"
          >
            {document?.tags?.length > 0
              ? document.tags.map(formatTag).join(", ")
              : "Unnamed Document"}
          </a>
        </p>
        <p className="govuk-hint">
          uploaded{" "}
          {new Date(document?.created_at ?? "").toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="govuk-hint">
          This file may not be suitable for users of assistive technology.
        </p>
      </div>
    </div>
  );
};

export default DocumentCard;
