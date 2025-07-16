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
import { BopsV2, BopsV2Documentation } from "@/handlers/bops";
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
      title="BOPS handler"
      active="BOPS handler"
      description={
        <p className="govuk-body">
          In the DPR we use the DPR API to fetch data from different handlers.
          This page documents the BOPS handler, which returns data from
          different BOPS environments depending on the council selected
        </p>
      }
      mainSection={
        <>
          <p className="govuk-body govuk-!-font-weight-bold">
            The examples below will not work outside of a development
            environment for security reasons
          </p>
          <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
          {Object.keys(BopsV2).map((endpoint) => {
            const docs = BopsV2Documentation[endpoint];
            const params = $args(BopsV2[endpoint]);
            return (
              <React.Fragment key={endpoint}>
                <EndpointCard
                  endpoint={endpoint}
                  handler={"BopsV2"}
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
