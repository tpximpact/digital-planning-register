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
import {
  ApiResponse,
  DprSearchApiResponse,
  UnknownSearchParams,
} from "@/types";
import { getValueFromUnknownSearchParams } from "@/lib/search";
import { AdminTemplate } from "@/app/(private)/admin/components/AdminTemplate";
import { AppConfig } from "@/config/types";
import { ApiV1 } from "@/actions/api";
import { validateSearchParams } from "@/lib/planningApplication/search";
import { ContentError } from "@/components/ContentError";
import Link from "next/link";
import { getCouncilDecision } from "@/lib/planningApplication/application";
import {
  Pagination,
  SearchParamsWithCouncil,
} from "@/components/govuk/Pagination";

// since no data fetch on this page force it to be dynamic so it gets correct council config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams?: UnknownSearchParams;
}

interface FetchDataProps extends Omit<PageProps, "searchParams"> {
  councilSlug: string;
  appConfig: AppConfig;
  searchParams: SearchParamsWithCouncil;
}

async function fetchData({
  councilSlug,
  searchParams,
  appConfig,
}: FetchDataProps): Promise<ApiResponse<DprSearchApiResponse | null>> {
  const response = await ApiV1.search(
    appConfig.council?.dataSource ?? "none",
    councilSlug,
    {
      ...searchParams,
      page: searchParams?.page ?? 1,
      resultsPerPage: appConfig.defaults.resultsPerPage ?? 10,
    },
  );

  return response;
}

const Page = async ({ searchParams }: PageProps) => {
  const councilSlug = searchParams
    ? getValueFromUnknownSearchParams(searchParams, "council")
    : undefined;

  const appConfig = getAppConfig(councilSlug);

  if (!appConfig.council || !councilSlug) {
    return (
      <AdminTemplate
        title={`Error: Valid council not specified`}
        mainSection={
          <p className="govuk-body">
            Please specify a valid council in the URL.
          </p>
        }
      />
    );
  }

  let validSearchParams: SearchParamsWithCouncil = validateSearchParams(
    appConfig,
    searchParams,
  );
  validSearchParams = {
    ...validSearchParams,
    council: councilSlug,
  };

  const response = await fetchData({
    councilSlug,
    searchParams: validSearchParams,
    appConfig,
  });

  if (
    !response ||
    response?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    return (
      <AdminTemplate
        title={`Error: Applications could not be loaded`}
        mainSection={<ContentError />}
      />
    );
  }

  const applications = response.data;
  const pagination = response.pagination;

  return (
    <AdminTemplate
      title={`${appConfig.council.name} Applications`}
      mainSection={
        <>
          {applications && (
            <>
              <div style={{ width: "100%", overflowX: "auto" }}>
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
                            href={`/${councilSlug}/${application.data.application.reference}`}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pagination && pagination.totalPages > 1 && (
                <Pagination
                  baseUrl={"/admin/council/applications"}
                  searchParams={validSearchParams}
                  pagination={pagination}
                />
              )}
            </>
          )}
        </>
      }
    />
  );
};

export default Page;
