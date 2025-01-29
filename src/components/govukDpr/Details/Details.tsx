import "./Details.scss";

export interface DetailsProps {
  summaryText: JSX.Element | string;
  text: JSX.Element | string;
  isInverted?: boolean;
}

export const Details = ({
  summaryText,
  text,
  isInverted = false,
}: DetailsProps) => {
  return (
    <details
      className={`govuk-details ${isInverted ? "govuk-details--inverted" : ""}`}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summaryText}</span>
      </summary>
      <div className="govuk-details__text">{text}</div>
    </details>
  );
};
