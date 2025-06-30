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
import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { ContentError } from "@/components/ContentError";
import { PageMain } from "@/components/PageMain";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/PageTemplate";
import Link from "next/link";
import { Pagination } from "@/components/govuk/Pagination";
import { getCouncilDecision } from "@/lib/planningApplication/application";

interface HomeProps {
  searchParams?: SearchParams & {
    council: string;
  };
}

const setCouncil = ({ searchParams }: HomeProps) => {
  const backupCouncil = process.env.TEST_COUNCILS
    ? "public-council-1"
    : "camden";
  const council = searchParams?.council ?? backupCouncil;
  return council;
};

async function fetchData({
  searchParams,
}: HomeProps): Promise<ApiResponse<DprSearchApiResponse | null>> {
  const council = setCouncil({ searchParams });
  const appConfig = getAppConfig(council);

  const response = await ApiV1.search(
    appConfig.council?.dataSource ?? "none",
    council,
    {
      ...searchParams,
      page: searchParams?.page ?? 1,
      resultsPerPage:
        searchParams?.resultsPerPage ?? appConfig.defaults.resultsPerPage,
    },
  );

  return response;
}

export async function generateMetadata() {
  return {
    title: "Documentation",
    description: "DPR documentation",
  };
}

export default async function PlanningApplicationSearch({
  searchParams,
}: HomeProps) {
  if (process.env.NODE_ENV !== "development") {
    return notFound();
  }

  const council = setCouncil({ searchParams });
  const appConfig = getAppConfig(council);
  const response = await fetchData({ searchParams });

  if (
    !response ||
    response?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    return (
      <PageTemplate appConfig={appConfig}>
        <PageMain>
          <ContentError />
        </PageMain>
      </PageTemplate>
    );
  }

  const applications = response.data;
  const pagination = response.pagination;

  return (
    <PageTemplate appConfig={appConfig}>
      <PageMain>
        <h1 className="govuk-heading-xl">Documentation</h1>
        {applications && (
          <>
            <table className="govuk-table">
              <caption className="govuk-table__caption govuk-table__caption--m">
                All {appConfig.council.name} applications
              </caption>
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th scope="col" className="govuk-table__header">
                    Reference
                  </th>
                  <th scope="col" className="govuk-table__header">
                    ApplicationType
                  </th>
                  <th scope="col" className="govuk-table__header">
                    Status
                  </th>
                  <th scope="col" className="govuk-table__header">
                    Status Summary
                  </th>
                  <th scope="col" className="govuk-table__header">
                    Decision
                  </th>
                  <th scope="col" className="govuk-table__header">
                    Decision Summary
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header govuk-table__header--numeric"
                  >
                    Public comments
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header govuk-table__header--numeric"
                  >
                    Specialist comments
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header govuk-table__header--numeric"
                  >
                    Designations
                  </th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {applications.map((application) => (
                  <tr
                    key={application.data.application.reference}
                    className="govuk-table__row"
                  >
                    <td className="govuk-table__cell">
                      <Link
                        className="govuk-link"
                        href={`/${council}/${application.data.application.reference}`}
                      >
                        {application.data.application.reference}
                      </Link>
                    </td>
                    <td className="govuk-table__cell">
                      {application.applicationType}
                    </td>
                    <td className="govuk-table__cell">
                      {application.data.application.status}
                    </td>
                    <td className="govuk-table__cell">
                      {application.applicationStatusSummary}
                    </td>
                    <td className="govuk-table__cell">
                      {getCouncilDecision(application)}
                    </td>
                    <td className="govuk-table__cell">
                      {application.applicationDecisionSummary}
                    </td>
                    <td className="govuk-table__cell govuk-table__cell--numeric">
                      {application.comments?.public?.comments?.length}
                    </td>
                    <td className="govuk-table__cell govuk-table__cell--numeric">
                      {application.comments?.specialist?.comments?.length}
                    </td>
                    <td className="govuk-table__cell govuk-table__cell--numeric">
                      {application.submission.data?.property?.planning
                        ?.designations?.length ?? "n/a"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                baseUrl={"/docs"}
                searchParams={searchParams}
                pagination={pagination}
              />
            )}
          </>
        )}
      </PageMain>
    </PageTemplate>
  );
}
