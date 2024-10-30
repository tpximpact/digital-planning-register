import { DprPagination, DprPlanningApplication, SearchParams } from "@/types";
import { BackLink } from "../button";
import { FormSearch } from "../FormSearch";
import { ContentNoResult } from "../ContentNoResult/ContentNoResult";
import { AppConfig } from "@/config/types";
import ApplicationCard from "../application_card";
import { Pagination } from "@/components/govuk/Pagination";
import { createPathFromParams } from "@/lib/navigation";

export interface PageSearchProps {
  appConfig: AppConfig;
  applications: DprPlanningApplication[] | undefined;
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
  const validationError =
    searchParams?.query && searchParams?.query.length < 3 ? true : false;
  return (
    <>
      {!applications && <BackLink />}
      <div className="govuk-main-wrapper">
        <FormSearch
          action={`/${appConfig.council.slug}`}
          searchParams={searchParams}
          validationError={validationError}
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
              <>
                <Pagination
                  baseUrl={createPathFromParams(params)}
                  searchParams={searchParams}
                  pagination={pagination}
                />
              </>
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
