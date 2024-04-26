import Link from "next/link";
import React from "react";

const NoResult = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-s" role="title">
          No applications match your search
        </h2>
        <p className="govuk-body">
          You can try searching again, or{" "}
          <Link href="/" className="govuk-link govuk-link--no-visited-state">
            go back to the default application list
          </Link>
        </p>
        <p className="govuk-body">
          If you having problems with finding what you need, you can:
        </p>
        <ul className="govuk-list govuk-list--bullet">
          <li>Check you have spelled everything correctly</li>
          <li>Try being less specific with your search query</li>
          <li>
            <Link
              href="https://www.gov.uk/"
              className="govuk-link govuk-link--no-visited-state"
              target="_blank"
            >
              Get in touch with the council
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NoResult;
