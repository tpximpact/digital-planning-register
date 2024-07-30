import React from "react";
import { getApplicationsByCouncil, searchApplication } from "../../actions";
import NoResult from "../../components/no_results";
import Pagination from "@/components/pagination";
import { BackLink } from "@/components/button";
import NotFound from "../not-found";
import { capitaliseWord } from "../../../util/capitaliseWord";
import {
  SearchParams,
  ApiResponse,
  V2PlanningApplications,
  V2PlanningApplicationsSearch,
} from "@/types";
import { Metadata } from "next";
import ApplicationCard from "@/components/application_card";
import { getNonStandardApplicationDetails } from "../../../util/applicationHelpers";

const resultsPerPage = 10;

interface PageParams {
  council: string;
}

interface HomeProps {
  params: PageParams;
  searchParams?: SearchParams | undefined;
}

async function fetchData({
  params,
  searchParams,
}: HomeProps): Promise<
  ApiResponse<V2PlanningApplications | V2PlanningApplicationsSearch | null>
> {
  const { council } = params;
  const page = parseInt(searchParams?.page as string) || 1;
  const search = searchParams?.search as string;

  // console.log("page:", council);
  // console.log("page:", page);
  // console.log("search:", search);

  /**
   * @todo endpoints for these will change to be the same /api/v2/public/planning_applications/search?page=1&maxresults=10
   * Currently these two endpoints return different data structures, getApplicationsByCouncil is a non standard soon to be deprecated one, searchApplication is closer to the final form
   */
  if (search && search.length >= 3) {
    const response = await searchApplication(
      search,
      council,
      page,
      resultsPerPage,
    );
    return response;
  } else {
    const response = await getApplicationsByCouncil(
      page,
      resultsPerPage,
      council,
    );
    return response;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: HomeProps): Promise<Metadata> {
  const response = await fetchData({ params, searchParams });
  const data = response.data ?? null;

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: "Digital Planning Register",
    description: `${capitaliseWord(params.council)} planning applications`,
  };
}

export default async function Home({ params, searchParams }: HomeProps) {
  const response = await fetchData({ params, searchParams });
  const page = parseInt(searchParams?.page || "1");
  const council = params.council;
  const search = !!(searchParams?.search && searchParams?.search.length >= 3);
  const validationError =
    searchParams?.search && searchParams?.search.length < 3 ? true : false;

  if (response?.status?.code !== 200) {
    return <NotFound params={params} />;
  }

  return (
    <>
      {!response?.data && <BackLink />}
      <div className="govuk-main-wrapper">
        <form action={`/${council}`} method="get" className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <div className="govuk-form-group">
              <h1 className="govuk-label-wrapper">
                <label className="govuk-label" htmlFor="search">
                  Search by application reference, address or description
                </label>
              </h1>
              <input
                className="govuk-input"
                id="search"
                name="search"
                type="text"
                defaultValue={searchParams?.search || ""}
                autoComplete="on"
              />
              {validationError && (
                <p id="search-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Enter at
                  least 3 characters to search
                </p>
              )}
            </div>
          </div>
          <div className="govuk-grid-column-one-quarter search-bar-buttons">
            <button className="govuk-button" type="submit">
              Search
            </button>
          </div>
        </form>
        {response?.data?.data && response?.data?.data.length > 0 ? (
          <>
            <div>
              {response?.data?.data.map((application, i) => {
                return (
                  <ApplicationCard
                    key={i}
                    council={council}
                    {...getNonStandardApplicationDetails(search, application)}
                  />
                );
              })}
            </div>
            {response?.data?.metadata?.total_pages > 1 && (
              <Pagination
                currentPage={page - 1}
                totalItems={
                  response?.data?.metadata?.total_pages * resultsPerPage
                }
                itemsPerPage={resultsPerPage}
                totalPages={response?.data?.metadata?.total_pages}
                baseUrl={`/${council}/`}
                queryParams={searchParams}
              />
            )}
          </>
        ) : (
          <NoResult council={council} />
        )}
      </div>
    </>
  );
}
