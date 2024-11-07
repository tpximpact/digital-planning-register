import "./Details.scss";

export interface DetailsProps {
  summaryText: JSX.Element | string;
  text: JSX.Element | string;
}

export const Details = ({ summaryText, text }: DetailsProps) => {
  return (
    <details className="govuk-details">
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summaryText}</span>
      </summary>
      <div className="govuk-details__text">{text}</div>
    </details>
  );
};
