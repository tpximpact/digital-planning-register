import { DprPagination, DprPlanningApplication, SearchParams } from "@/types";
import { BackLink, ButtonEmailSignUp } from "../button";
import { FormSearch } from "../FormSearch";
import { ContentNoResult } from "../ContentNoResult";
import { AppConfig } from "@/config/types";
import { ApplicationCard } from "../ApplicationCard";
import { Pagination } from "@/components/Pagination";
import "./PageSearch.scss";

export interface PageSearchProps {
  appConfig: AppConfig;
  applications: DprPlanningApplication[] | undefined;
  pagination: DprPagination | undefined;
  searchParams?: SearchParams;
}

export const PageSearch = ({
  appConfig,
  applications,
  pagination,
  searchParams,
}: PageSearchProps) => {
  if (!appConfig || !appConfig.council) {
    return null;
  }
  const page = searchParams?.page ? searchParams.page : 1;

  const hasSearchQuery = searchParams?.query ? true : false;
  const title = hasSearchQuery
    ? "Search results"
    : "Recently published applications";

  return (
    <>
      {!applications && <BackLink />}
      <div className="govuk-main-wrapper">
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
                  <ButtonEmailSignUp
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
            <h2 className="govuk-heading-l">{title}</h2>
            {applications.map((application) => (
              <ApplicationCard
                key={application.application.reference}
                councilSlug={appConfig.council!.slug}
                application={application}
              />
            ))}
            {pagination && pagination.total_pages > 1 && (
              <Pagination
                currentPage={page - 1}
                totalItems={
                  pagination.total_pages * appConfig.defaults.resultsPerPage
                }
                itemsPerPage={appConfig.defaults.resultsPerPage}
                totalPages={pagination.total_pages}
                baseUrl={`/${appConfig.council.slug}/`}
                queryParams={searchParams}
              />
            )}
          </>
        ) : (
          <>
            <ContentNoResult councilConfig={appConfig.council} />
          </>
        )}
      </div>
    </>
  );
};
