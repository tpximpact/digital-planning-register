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

import React from "react";
import { getAppConfig } from "@/config";
import { AdminTemplate } from "./components/AdminTemplate";
import Link from "next/link";

// since no data fetch on this page force it to be dynamic so it gets correct council config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

const Main = () => {
  const appConfig = getAppConfig();

  return (
    <AdminTemplate
      title="Digital Planning Register Admin"
      active="View all Councils"
      backUrl={false}
      description={
        <p className="govuk-body">
          This section is for administrators to view and manage the application
          configuration settings.
        </p>
      }
      mainSection={
        <>
          <table className="govuk-table">
            <caption className="govuk-table__caption govuk-table__caption--m">
              List of all councils on the platform
            </caption>
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">
                  Name
                </th>
                <th scope="col" className="govuk-table__header">
                  Visibility
                </th>
                <th scope="col" className="govuk-table__header">
                  Data source
                </th>
                <th scope="col" className="govuk-table__header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              {appConfig.councils.map((council) => (
                <tr className="govuk-table__row" key={`${council.slug}_row`}>
                  <th scope="row" className="govuk-table__header">
                    <Link
                      href={`/admin/council?council=${council.slug}`}
                      className="govuk-link"
                    >
                      {council.name}
                    </Link>
                  </th>
                  <td className="govuk-table__cell">
                    <strong
                      className={`govuk-tag ${
                        council.visibility === "public"
                          ? "govuk-tag--green"
                          : council.visibility === "private"
                            ? "govuk-tag--red"
                            : "govuk-tag--grey"
                      }`}
                    >
                      {council.visibility}
                    </strong>
                  </td>
                  <td className="govuk-table__cell">{council.dataSource}</td>
                  <td className="govuk-table__cell">
                    <div className="govuk-button-group">
                      <Link
                        className="govuk-button govuk-button--secondary"
                        href={`/admin/council/applications?council=${council.slug}`}
                      >
                        View applications
                      </Link>{" "}
                      {/* <Link
                        className="govuk-button govuk-button--secondary"
                        href={`/admin/council/status?council=${council.slug}`}
                      >
                        View API Status
                      </Link> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
    />
  );
};

export default Main;
