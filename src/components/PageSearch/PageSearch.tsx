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

import { DprApplication, DprPagination, SearchParams } from "@/types";
import { BackButton } from "../BackButton";
import { FormSearch } from "../FormSearch";
import { ContentNoResult } from "../ContentNoResult";
import { AppConfig } from "@/config/types";
import { ApplicationCard } from "../ApplicationCard";
import { Pagination } from "@/components/govuk/Pagination";
import "./PageSearch.scss";
import { EmailSignUpButton } from "../EmailSignUpButton";
import { PageMain } from "../PageMain";
import { createPathFromParams } from "@/lib/navigation";

export interface PageSearchProps {
  appConfig: AppConfig;
  applications: DprApplication[] | null;
  pagination: DprPagination | undefined;
  params?: {
    council: string;
    reference?: string;
  };
  searchParams?: SearchParams;
}

export const PageSearch = ({
  appConfig,
  applications,
  pagination,
  params,
  searchParams,
}: PageSearchProps) => {
  if (!appConfig || !appConfig.council) {
    return null;
  }
  const hasSearchQuery = searchParams?.query ? true : false;
  const title = hasSearchQuery
    ? "Search results"
    : "Recently published applications";

  const council = appConfig.council;
  const baseUrl = `/${council.slug}`;

  return (
    <>
      {!applications && <BackButton baseUrl={baseUrl} />}
      <PageMain>
        {!hasSearchQuery && (
          <div className="govuk-grid-row intro-text">
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
            {appConfig.council?.pageContent?.email_alerts
              ?.sign_up_for_alerts_link && (
              <div className="govuk-grid-column-one-third">
                <div className="email-signup-button-container">
                  <EmailSignUpButton
                    href={
                      appConfig.council?.pageContent?.email_alerts
                        ?.sign_up_for_alerts_link
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <FormSearch
          action={`/${appConfig.council.slug}`}
          searchParams={searchParams}
        />
        {applications && applications?.length > 0 ? (
          <>
            {hasSearchQuery ? (
              <h1 className="govuk-heading-l">{title}</h1>
            ) : (
              <h2 className="govuk-heading-l">{title}</h2>
            )}

            {applications.map((application) => (
              <ApplicationCard
                key={application?.data?.application?.reference}
                councilSlug={appConfig.council!.slug}
                application={application}
              />
            ))}
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                baseUrl={createPathFromParams(params)}
                searchParams={searchParams}
                pagination={pagination}
              />
            )}
          </>
        ) : (
          <>
            <h1 className="govuk-visually-hidden">Search results</h1>
            <ContentNoResult councilConfig={appConfig.council} />
          </>
        )}
      </PageMain>
    </>
  );
};
