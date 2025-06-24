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

import {
  ApiResponse,
  DprSearchApiResponse,
  SearchParamsApplication,
} from "@/types";
import { FormSearch } from "@/components/FormSearch";
import { ContentNoResult } from "@/components/ContentNoResult";
import { AppConfig } from "@/config/types";
import { ApplicationCard } from "@/components/ApplicationCard";
import { Pagination } from "@/components/govuk/Pagination";
import "./PageSearch.scss";
import { EmailSignUpButton } from "@/components/EmailSignUpButton";
import { PageMain } from "@/components/PageMain";
import { createPathFromParams } from "@/lib/navigation";
import { checkSearchPerformed } from "@/lib/planningApplication/search";
import { pascalToSentenceCase } from "@/util";
import { NotificationBanner } from "@/components/govuk/NotificationBanner";
import { FormSearchFull } from "@/components/FormSearchFull";
import { FormApplicationsSort } from "@/components/FormApplicationsSort";
import React, { Suspense } from "react";
import { applicationSearchFields } from "@/util/featureFlag";
import { ContentNotOnDprYet } from "../ContentNotOnDprYet";

export interface PageSearchProps {
  params: {
    council: string;
  };
  appConfig: AppConfig;
  searchParams: SearchParamsApplication;
  response: ApiResponse<DprSearchApiResponse | null>;
}

export const PageSearch = ({
  params,
  appConfig,
  searchParams,
  response,
}: PageSearchProps) => {
  const { council } = params;
  const type = searchParams.type;
  const searchPerformed = checkSearchPerformed(searchParams);

  // heading
  const pageTitleHeadingLevel =
    type === "simple" && !searchPerformed ? "h2" : "h1";
  let pageTitle = searchPerformed
    ? "Search results"
    : "Recently published applications";
  if (searchParams?.dprFilter) {
    pageTitle = `Applications ${pascalToSentenceCase(searchParams.dprFilter)}`;
  }

  // misc
  const emailAlertsLink =
    appConfig.council?.pageContent?.email_alerts?.sign_up_for_alerts_link;

  return (
    <PageMain>
      {type === "simple" && !searchPerformed && (
        <SimpleNoSearchHeader
          emailAlertsLink={emailAlertsLink}
          appConfig={appConfig}
        />
      )}
      {type === "full" && searchPerformed && (
        <NotificationBanner
          title={<>Your results</>}
          heading={
            <>
              <a
                className="govuk-notification-banner__link"
                href="#search-results"
              >
                Scroll down to your search results
              </a>
            </>
          }
        />
      )}

      <form
        action={createPathFromParams(params, "search-form")}
        method="get"
        className="govuk-form"
        aria-label="Search applications"
      >
        <input type="hidden" name="council" value={council} />

        {type === "simple" && (
          <FormSearch params={params} searchParams={searchParams} />
        )}
        {type === "full" && (
          <FormSearchFull councilSlug={council} searchParams={searchParams} />
        )}
        {React.createElement(
          pageTitleHeadingLevel,
          { className: "govuk-heading-l", id: "search-results" },
          pageTitle,
        )}

        {applicationSearchFields.includes("sortBy") && (
          <FormApplicationsSort searchParams={searchParams} />
        )}
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        {response.data !== null ? (
          <>
            {response.data.map((application) => (
              <ApplicationCard
                key={application?.data?.application?.reference}
                councilSlug={council}
                application={application}
              />
            ))}
            {response.pagination &&
              response.pagination.currentPage ===
                response.pagination.totalPages && (
                <ContentNotOnDprYet council={appConfig.council} />
              )}
            {response.pagination && response.pagination.totalPages > 1 && (
              <Pagination
                baseUrl={createPathFromParams(params)}
                searchParams={searchParams}
                pagination={response.pagination}
              />
            )}
          </>
        ) : (
          <>
            <ContentNoResult
              councilConfig={appConfig.council}
              type="application"
            />
            <ContentNotOnDprYet council={appConfig.council} />
          </>
        )}
      </Suspense>
    </PageMain>
  );
};

/**
 * This header is used for the simple search page and is only displayed when a search hasn't been done
 * @param param0
 * @returns
 */
const SimpleNoSearchHeader = ({
  emailAlertsLink,
  appConfig,
}: {
  emailAlertsLink?: string;
  appConfig: AppConfig;
}) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl">
          Welcome to the Digital Planning Register
        </h1>
        <p className="govuk-body">
          You can find planning applications submitted through the Open Digital
          Planning system for your local council planning authority.
        </p>
        <ContentNotOnDprYet council={appConfig.council} />
      </div>

      {emailAlertsLink && (
        <div className="govuk-grid-column-one-third">
          <div className="email-signup-button-container">
            <EmailSignUpButton href={emailAlertsLink} />
          </div>
        </div>
      )}
    </div>
  );
};
