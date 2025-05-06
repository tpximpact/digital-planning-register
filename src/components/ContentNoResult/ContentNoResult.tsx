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

import Link from "next/link";
import { AppConfig } from "@/config/types";

export type ContentNoResultContentTypes = "comment" | "application";

interface ContentNoResultProps {
  councilConfig?: AppConfig["council"];
  type?: ContentNoResultContentTypes;
}

const getNoResultTitle = (type?: ContentNoResultContentTypes) => {
  const titleMap: Record<ContentNoResultContentTypes, string> = {
    comment: "comments",
    application: "applications",
  };
  return titleMap[type ?? "application"];
};

export const ContentNoResult = ({
  councilConfig,
  type,
}: ContentNoResultProps) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-s">
          No {getNoResultTitle(type)} match your search
        </h2>
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
            {councilConfig?.contact ? (
              <Link
                href={councilConfig?.contact}
                className="govuk-link govuk-link--no-visited-state"
                target="_blank"
              >
                Get in touch with the council
              </Link>
            ) : (
              <>Get in touch with the council</>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
