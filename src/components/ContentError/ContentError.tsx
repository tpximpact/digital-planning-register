import { AppConfig } from "@/config/types";

import Link from "next/link";

export const ContentError = () => {
  let links = [
    {
      href: "/",
      text: "Try selecting a council",
    },
    {
      href: "https://www.gov.uk/find-local-council",
      text: "Get in touch with the council",
      target: "_blank",
    },
  ];

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-l">
            Sorry, there is a problem with the service
          </h1>
          <p className="govuk-body">Try again later.</p>
          <p className="govuk-body">
            If you are having problems finding what you need, you can:
          </p>
          {links && links.length > 0 && (
            <ul className="govuk-list govuk-list--bullet">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="govuk-link govuk-link--no-visited-state"
                    target={link.target}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
