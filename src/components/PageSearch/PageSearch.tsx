import { DprPagination, DprPlanningApplication, SearchParams } from "@/types";
import { BackLink } from "../button";
import { FormSearch } from "../FormSearch";
import { ContentNoResult } from "../ContentNoResult/ContentNoResult";
import { AppConfig } from "@/config/types";
import ApplicationCard from "../application_card";
import { Pagination } from "@/components/Pagination";

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

  return (
    <>
      {!applications && <BackLink />}
      <div className="govuk-main-wrapper">
        <FormSearch
          action={`/${appConfig.council.slug}`}
          searchParams={searchParams}
        />
        {applications && applications?.length > 0 ? (
          <>
            <h2 className="govuk-heading-m">{`${Object.keys(searchParams as SearchParams).length > 0 ? "Search results" : "Recently published applications"}`}</h2>
            {applications.map((application) => (
              <ApplicationCard
                key={application.application.reference}
                councilSlug={appConfig.council!.slug}
                {...application}
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
