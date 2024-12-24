import { DprPagination, DprPlanningApplication, SearchParams } from "@/types";
import { ContentNoResult } from "../ContentNoResult/ContentNoResult";
import { AppConfig } from "@/config/types";
import { Pagination } from "@/components/govuk/Pagination";
import { SiteNoticeCard } from "../SiteNoticeCard";
import { createPathFromParams } from "@/lib/navigation";

export interface PageSearchSiteNoticesProps {
  appConfig: AppConfig;
  applications: DprPlanningApplication[] | undefined;
  pagination: DprPagination | undefined;
  params?: {
    council: string;
    reference?: string;
  };
  searchParams?: SearchParams;
}

export const PageSearchSiteNotices = ({
  appConfig,
  applications,
  pagination,
  params,
  searchParams,
}: PageSearchSiteNoticesProps) => {
  if (!appConfig || !appConfig.council) {
    return null;
  }
  const page = searchParams?.page ? searchParams.page : 1;
  const validationError =
    searchParams?.query && searchParams?.query.length < 3 ? true : false;

  return (
    <>
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
              baseUrl={createPathFromParams(params)}
              searchParams={searchParams}
              pagination={pagination}
            />
          )}
        </>
      ) : (
        <>
          <ContentNoResult councilConfig={appConfig.council} />
        </>
      )}
    </>
  );
};
