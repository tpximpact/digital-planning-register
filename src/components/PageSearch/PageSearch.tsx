import { DprPagination, DprPlanningApplication, SearchParams } from "@/types";
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
  applications: DprPlanningApplication[] | null;
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
  const page = searchParams?.page ? searchParams.page : 1;

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
                key={application.application.reference}
                councilSlug={appConfig.council!.slug}
                application={application}
              />
            ))}
            {pagination && pagination.total_pages > 1 && (
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
