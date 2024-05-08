"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "../../../util/config.json";

const NotFoundLink = () => {
  const pathname = usePathname();
  const council = pathname.split("/")[1];
  const councilConfig: any = config[`${council}`];
  const contact: any =
    councilConfig?.contact || "https://www.gov.uk/find-local-council ";
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
};

export default NotFoundLink;
