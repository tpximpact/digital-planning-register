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

import { PageMain } from "@/components/PageMain";
import Link from "next/link";

export interface AdminTemplateProps {
  title: string;
  description?: React.ReactNode;
  mainSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
  active?: "View all Councils" | "Settings" | "Local handler" | "BOPS handler";
  backUrl?: string | boolean;
}

export const AdminTemplate = ({
  title = "Digital Planning Register Admin",
  description,
  mainSection,
  sidebarSection,
  active,
  backUrl = "/admin",
}: AdminTemplateProps) => {
  return (
    <>
      {backUrl && typeof backUrl === "string" && (
        <a href={backUrl} className="govuk-back-link">
          Back to all councils
        </a>
      )}
      <PageMain>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">{title}</h1>
            {description && description}
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
            {mainSection && mainSection}
          </div>
          <div className="govuk-grid-column-one-third">
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
            <ul className="govuk-list govuk-list--spaced">
              <li>
                <Link
                  className={`govuk-link govuk-link--no-visited-state${active === "View all Councils" ? " govuk-!-font-weight-bold" : ""}`}
                  href="/admin"
                >
                  View all Councils
                </Link>
              </li>
              <li>
                <Link
                  className={`govuk-link govuk-link--no-visited-state${active === "Settings" ? " govuk-!-font-weight-bold" : ""}`}
                  href="/admin/settings"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  className={`govuk-link govuk-link--no-visited-state${active === "Local handler" ? " govuk-!-font-weight-bold" : ""}`}
                  href="/admin/handlers/local"
                >
                  Local handler
                </Link>
              </li>
              <li>
                <Link
                  className={`govuk-link govuk-link--no-visited-state${active === "BOPS handler" ? " govuk-!-font-weight-bold" : ""}`}
                  href="/admin/handlers/bops"
                >
                  BOPS handler
                </Link>
              </li>
            </ul>
            {sidebarSection && sidebarSection}
          </div>
        </div>
      </PageMain>
    </>
  );
};
