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

import React, { Suspense } from "react";
import { UnknownSearchParams } from "@/types";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/PageTemplate";
import { getValueFromUnknownSearchParams } from "@/lib/search";
import { validateSearchParams } from "@/lib/planningApplication/search";
import { FormSearch } from "@/components/FormSearch";
import ShowApplications from "./showApplications";
import { ContentError } from "@/components/ContentError";

interface HomeProps {
  searchParams?: UnknownSearchParams;
}

export async function generateMetadata() {
  return {
    title: "Test page",
    description: "Test page for azure blob storage",
  };
}

export default async function PlanningApplicationSearch({
  searchParams,
}: HomeProps) {
  const appConfig = getAppConfig();

  const accessToken =
    searchParams && searchParams.accessToken
      ? getValueFromUnknownSearchParams(searchParams, "accessToken")
      : undefined;

  if (!accessToken || accessToken !== process.env.TEST_KEY) {
    return notFound();
  }

  try {
    const validSearchParams = validateSearchParams(appConfig, searchParams);

    return (
      <PageTemplate appConfig={appConfig}>
        <PageMain>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">
                Welcome to the Digital Planning Register
              </h1>
              <p className="govuk-body">
                You can find planning applications submitted through the Open
                Digital Planning system for your local council planning
                authority.
              </p>
              <p className="govuk-body">
                Not all planning applications will be available through this
                register. You may need to check individual council&apos;s
                websites to see what records are kept here.
              </p>
            </div>
          </div>
          <FormSearch params={{}} searchParams={validSearchParams} />

          <Suspense fallback={<p>Loading application data...</p>}>
            <h2 className="govuk-heading-l">Recently published applications</h2>
            <ShowApplications
              validSearchParams={validSearchParams}
              accessToken={accessToken}
            />
          </Suspense>
        </PageMain>
      </PageTemplate>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    const message = error instanceof Error ? error.message : String(error);

    return (
      <PageTemplate appConfig={appConfig}>
        <PageMain>
          <ContentError />
          <p className="govuk-body">
            An error occurred while fetching the data: {message}
          </p>
        </PageMain>
      </PageTemplate>
    );
  }
}
