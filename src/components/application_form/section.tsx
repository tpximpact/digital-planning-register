import {
  DprApplicationSubmissionSubtopic,
  DprApplicationSubmissionSubtopicValue,
} from "@/types";
import { Row } from "./row";

export const Section = ({
  subtopic,
  value,
}: DprApplicationSubmissionSubtopic) => {
  // if value is an array it will be an array of DprApplicationSubmissionSubtopicValue
  const renderRow = (
    value: DprApplicationSubmissionSubtopicValue[],
    i: number,
  ): React.ReactNode => {
    return value.map((item, i) => {
      if (Array.isArray(item.value)) {
        return renderRow(item.value, i);
      } else {
        return <Row key={i} {...item} />;
      }
    });
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h3 className="govuk-heading-m">{subtopic}</h3>
        <dl className="govuk-summary-list">{renderRow(value, 0)}</dl>
      </div>
    </div>
  );
};
