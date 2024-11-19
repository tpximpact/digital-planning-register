import { DprPagination, DprPlanningApplication, SearchParams } from "@/types";
import { ContentNoResult } from "../ContentNoResult/ContentNoResult";
import { AppConfig } from "@/config/types";
import { Pagination } from "../Pagination";
import { SiteNoticeCard } from "../SiteNoticeCard";

export interface PageSearchSiteNoticesProps {
  appConfig: AppConfig;
  applications: DprPlanningApplication[] | undefined;
  pagination: DprPagination | undefined;
  searchParams?: SearchParams;
}

export const PageSearchSiteNotices = ({
  appConfig,
  applications,
  pagination,
  searchParams,
}: PageSearchSiteNoticesProps) => {
  if (!appConfig || !appConfig.council) {
    return null;
  }
  const page = searchParams?.page ? searchParams.page : 1;
  const validationError =
    searchParams?.query && searchParams?.query.length < 3 ? true : false;

  return (
    <div className="govuk-main-wrapper">
      <h1 className="govuk-heading-xl">Find digital site notices near you</h1>
      <p className="govuk-body grid-row-extra-bottom-margin">
        Digital site notices are created for significant planning applications
        that require public consultation. They present information differently
        to planning applications that do not require public consultation. This
        is to make it easier for you to access the information most important to
        the local community.
      </p>
      {appConfig.council?.pageContent?.email_alerts
        ?.sign_up_for_alerts_link && (
        <a
          className="govuk-button govuk-button--secondary"
          target="_blank"
          href={
            appConfig.council?.pageContent?.email_alerts
              ?.sign_up_for_alerts_link
          }
        >
          Sign up for alerts on applications near you
        </a>
      )}
      {applications && applications?.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin ">
            {applications.map((application, index) => (
              <SiteNoticeCard
                key={`sitenoticecard-${index}`}
                councilSlug={appConfig.council!.slug}
                application={application}
              />
            ))}
          </div>
          {pagination && pagination.total_pages > 1 && (
            <Pagination
              currentPage={page - 1}
              totalItems={
                pagination.total_pages * appConfig.defaults.resultsPerPage
              }
              itemsPerPage={appConfig.defaults.resultsPerPage}
              totalPages={pagination.total_pages}
              baseUrl={`/${appConfig.council.slug}/digital-site-notice`}
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
  );
};
