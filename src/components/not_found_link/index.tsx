import Link from "next/link";
import config from "../../../util/config.json";

interface NotFoundLinkProps {
  params?: { council: string };
}

export default function NotFoundLink({ params }: NotFoundLinkProps) {
  const council = params?.council || "";
  const configData = config as Record<string, any>;
  const councilConfig = configData[council];
  const contact =
    councilConfig?.contact || "https://www.gov.uk/find-local-council";
  const applicationSearchUrl = councilConfig?.name ? `/${council}` : "/";

  return (
    <ul className="govuk-list govuk-list--bullet">
      <li>
        <Link
          href={applicationSearchUrl}
          className="govuk-link govuk-link--no-visited-state"
        >
          Try searching for an application
        </Link>
      </li>
      <li>
        <Link
          href={contact}
          className="govuk-link govuk-link--no-visited-state"
          target="_blank"
        >
          Get in touch with the council
        </Link>
      </li>
    </ul>
  );
}
