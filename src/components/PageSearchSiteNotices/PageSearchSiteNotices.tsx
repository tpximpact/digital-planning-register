import { DprPagination, DprPlanningApplication, SearchParams } from "@/types";
import { BackLink } from "../button";
import { ContentNoResult } from "../ContentNoResult/ContentNoResult";
import { AppConfig } from "@/config/types";
import ApplicationCard from "../application_card";
import { Pagination } from "../Pagination";
import ApplicationMap from "../application_map";

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
      <h1 className="govuk-heading-xl small-bottom-margin">
        Find digital site notices near you
      </h1>
      <p className="govuk-body grid-row-extra-bottom-margin">
        Digital site notices are created for significant planning applications
        that require public consultation. They present information differently
        to planning applications that do not require public consultation. This
        is to make it easier for you to access the information most important to
        the local community.
      </p>
      {appConfig.council?.pageContent?.digital_site_notice
        ?.sign_up_for_alerts_link && (
        <a
          className="govuk-button govuk-button--secondary"
          target="_blank"
          href={
            appConfig.council?.pageContent?.digital_site_notice
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
  // return (
  //   <>
  //     {!applications && <BackLink />}
  //     <div className="govuk-main-wrapper">
  //       <FormSearch
  //         action={`/${appConfig.council.slug}`}
  //         searchParams={searchParams}
  //         validationError={validationError}
  //       />
  //       {applications && applications?.length > 0 ? (
  //         <>
  //           {applications.map((application) => (
  //             <ApplicationCard
  //               key={application.application.reference}
  //               councilSlug={appConfig.council!.slug}
  //               {...application}
  //             />
  //           ))}
  //           {pagination.total_pages > 1 && (
  //             <Pagination
  //               currentPage={page - 1}
  //               totalItems={
  //                 pagination.total_pages * appConfig.defaults.resultsPerPage
  //               }
  //               itemsPerPage={appConfig.defaults.resultsPerPage}
  //               totalPages={pagination.total_pages}
  //               baseUrl={`/${appConfig.council.slug}/`}
  //               queryParams={searchParams}
  //             />
  //           )}
  //         </>
  //       ) : (
  //         <>
  //           <ContentNoResult councilConfig={appConfig.council} />
  //         </>
  //       )}
  //     </div>
  //   </>
  // );
};

const SiteNoticeCard = ({
  councilSlug,
  application,
}: {
  councilSlug: string;
  application: DprPlanningApplication;
}) => {
  const reference = application.application.reference;
  const boundary_geojson = application.property.boundary.site;
  const address = application.property.address.singleLine;
  return (
    <div
      key={application.application.reference}
      className="govuk-grid-column-one-third"
    >
      <a href={`/${councilSlug}/${reference}`}>
        <ApplicationMap
          reference={reference}
          mapData={boundary_geojson}
          staticMap={true}
        />
        <div className="govuk-link govuk-link--no-visited-state govuk-heading-m dsn-link">
          {reference}
        </div>
      </a>
      <span>
        <p className="govuk-body">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="20"
            viewBox="0 -4 10 18"
            fill="none"
          >
            <path
              d="M5 0.163574C2.24311 0.163574 0 2.40641 0 5.16357C0 9.30637 4.44743 13.198 4.63677 13.3618L5 13.6759L5.36323 13.3618C5.55257 13.198 10 9.30637 10 5.16357C10 2.40641 7.75689 0.163574 5 0.163574ZM5 12.1834C3.97054 11.189 1.11111 8.15728 1.11111 5.16357C1.11111 3.01948 2.85563 1.27469 5 1.27469C7.14437 1.27469 8.88889 3.01948 8.88889 5.16357C8.88889 8.15728 6.02946 11.189 5 12.1834Z"
              fill="#0B0C0C"
            ></path>
            <path
              d="M5 2.75854C3.89727 2.75854 3 3.65581 3 4.75854C3 5.86128 3.89727 6.75854 5 6.75854C6.10273 6.75854 7 5.86128 7 4.75854C7 3.65581 6.10273 2.75854 5 2.75854ZM5 5.95854C4.33828 5.95854 3.8 5.42026 3.8 4.75854C3.8 4.09683 4.33828 3.55854 5 3.55854C5.66172 3.55854 6.2 4.09683 6.2 4.75854C6.2 5.42026 5.66172 5.95854 5 5.95854Z"
              fill="#0B0C0C"
            ></path>
          </svg>{" "}
          {address}
        </p>
      </span>
    </div>
  );
};
