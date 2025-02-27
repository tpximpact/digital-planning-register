/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { AppConfig } from "@/config/types";

import Link from "next/link";

export interface ContentNotFoundProps {
  councilConfig?: AppConfig["council"];
}

export const ContentNotFound = ({ councilConfig }: ContentNotFoundProps) => {
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

  if (councilConfig) {
    links = [
      {
        href: `/${councilConfig.slug}`,
        text: "Try searching for an application",
      },
      {
        href: councilConfig.contact ?? "https://www.gov.uk/find-local-council",
        text: "Get in touch with the council",
        target: "_blank",
      },
    ];
  }

  return (
    <>
      <h1 className="govuk-heading-l">Page not found</h1>
      <p className="govuk-body">
        The link you have used may be incorrect, or you are trying to reach a
        planning application that doesn&apos;t exist.
      </p>
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
    </>
  );
};
