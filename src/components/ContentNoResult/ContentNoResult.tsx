import Link from "next/link";
import { AppConfig } from "@/config/types";

interface ContentNoResultProps {
  councilConfig?: AppConfig["council"];
}

export const ContentNoResult = ({ councilConfig }: ContentNoResultProps) => {
  const getInTouchURL = councilConfig?.contact || "https://www.gov.uk/";

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-s">No applications match your search</h2>
        {councilConfig?.slug && (
          <p className="govuk-body">
            You can try searching again, or{" "}
            <Link
              href={`/${councilConfig.slug}`}
              className="govuk-link govuk-link--no-visited-state"
            >
              go back
            </Link>
          </p>
        )}
        <p className="govuk-body">
          If you are having problems with finding what you need, you can:
        </p>
        <ul className="govuk-list govuk-list--bullet">
          <li>Check you have spelled everything correctly</li>
          <li>Try being less specific with your search query</li>
          <li>
            <Link
              href={getInTouchURL}
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
