/* eslint-disable react/no-unescaped-entities */
import { DprDocument } from "@/types";
import { DocumentCard } from "@/components/DocumentCard";
import "../DocumentsList/DocumentsList.scss";

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
          <div className="dpr-documents-list__cards">
            {appealDocuments.map((document, i) => (
              <DocumentCard key={i} document={document} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
