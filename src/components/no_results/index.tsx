import Link from "next/link";
import config from "../../../util/config.json";
import { Config } from "@/types";

interface NoResultProps {
  council: string;
}

const NoResult = ({ council }: NoResultProps) => {
  const configCouncil: Config = config;
  const getInTouchURL =
    configCouncil[council]?.contact || "https://www.gov.uk/";

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-s" role="title">
          No applications match your search
        </h2>
        <p className="govuk-body">
          You can try searching again, or{" "}
          <Link
            href={`/${council}`}
            className="govuk-link govuk-link--no-visited-state"
          >
            go back
          </Link>
        </p>
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

export default NoResult;
