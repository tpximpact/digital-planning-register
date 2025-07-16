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
import { LocalV1, LocalV1Documentation } from "@/handlers/local";
import { EndpointCard } from "@/app/(private)/admin/components/EndpointCard";
import { $args } from "@/app/(private)/admin/utils";
import { AdminTemplate } from "@/app/(private)/admin/components/AdminTemplate";

// since no data fetch on this page force it to be dynamic so it gets correct council config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

const Main = () => {
  // const appConfig = getAppConfig();

  return (
    <AdminTemplate
      title="Local handler"
      active="Local handler"
      description={
        <p className="govuk-body">
          In the DPR we use the DPR API to fetch data from different handlers.
          This page documents the Local handler, which returns mocked data from
          the application itself.
        </p>
      }
      mainSection={
        <>
          <p className="govuk-body">
            The local handler acts as a local development tool to simulate API
            responses without needing a live backend.{" "}
          </p>
          <p className="govuk-body">
            This handler is useful for testing and development purposes,
            allowing developers to work with a consistent set of data without
            relying on external services.
          </p>
          <p className="govuk-body govuk-!-font-weight-bold">
            It is not intended for production use and should only be used in a
            local development or staging environment when testing feature flag
            functionality.
          </p>
          <p className="govuk-body govuk-!-font-weight-bold">
            The examples below will not work outside of a development
            environment for security reasons
          </p>
          <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
          {Object.keys(LocalV1).map((endpoint) => {
            const docs = LocalV1Documentation[endpoint];
            const params = $args(LocalV1[endpoint]);
            return (
              <React.Fragment key={endpoint}>
                <EndpointCard
                  endpoint={endpoint}
                  handler={"LocalV1"}
                  docs={docs}
                  params={params}
                />
                <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
              </React.Fragment>
            );
          })}
        </>
      }
    />
  );
};

export default Main;
