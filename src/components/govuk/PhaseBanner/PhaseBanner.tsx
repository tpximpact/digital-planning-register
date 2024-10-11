import "./PhaseBanner.scss";

export const PhaseBanner = () => {
  return (
    <div className="govuk-phase-banner">
      <p className="govuk-phase-banner__content">
        <strong className="govuk-tag govuk-phase-banner__content__tag">
          Beta
        </strong>
        <span className="govuk-phase-banner__text">
          This is a new service. Help us improve it and{" "}
          <a
            className="govuk-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfERu46lRoEk6hBQj6diQNwe8QM8HZorNotNRPj-yJ3FkJaxQ/viewform"
          >
            give your feedback (opens in new tab)
          </a>
          .
        </span>
      </p>
    </div>
  );
};
