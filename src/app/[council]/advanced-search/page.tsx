import React from "react";
import { getPublicApplicationsAdvanced } from "../../../actions";
import NoResult from "../../../components/no_results";
import Pagination from "@/components/pagination";
import { BackLink } from "@/components/button";
import NotFound from "../../not-found";
import { capitaliseWord } from "../../../../util/capitaliseWord";
import { ApiResponse, DprPublicApplicationListings } from "@/types";
import { Metadata } from "next";
import ApplicationCard from "@/components/application_card";

const resultsPerPage = 10;

interface PageParams {
  council: string;
}

interface SearchParams {
  reference?: string;
  address?: string;
  postcode?: string;
  description?: string;
  date3?: string;
  date4?: string;
  date5?: string;
  date6?: string;
  date7?: string;
  date8?: string;
  date9?: string;
  date10?: string;
  date11?: string;
  date12?: string;
  sort?: string;
  page?: string;
}

interface HomeProps {
  params: PageParams;
  searchParams?: SearchParams;
}

async function fetchData({
  params,
  searchParams,
}: HomeProps): Promise<ApiResponse<DprPublicApplicationListings | null>> {
  const { council } = params;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const searchTerms = Object.entries(searchParams || {})
    .filter(([key, value]) => value && key !== "page" && key !== "sort")
    .map(([key, value]) => `${key}:${value}`)
    .join(" ");

  const response = await getPublicApplicationsAdvanced(
    page,
    resultsPerPage,
    council,
    searchTerms,
  );

  return response;
}

export default async function AdvancedSearch({
  params,
  searchParams,
}: HomeProps) {
  const response = await fetchData({ params, searchParams });
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const council = params.council;

  if (response?.status?.code !== 200) {
    return <NotFound params={params} />;
  }

  return (
    <>
      <div className="govuk-main-wrapper">
        <form
          action={`/${council}/advanced-search`}
          method="get"
          className="govuk-grid-row grid-row-extra-bottom-margin"
        >
          <div className="govuk-grid-column-full">
            {/* Back to simple search */}
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <a
                  href={`/${council}`}
                  role="button"
                  className="govuk-button govuk-button--secondary"
                  data-module="govuk-button"
                >
                  Back to simple search
                </a>
              </div>
            </div>

            {/* Application reference, Address, Postcode */}
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-third">
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="reference">
                    Application reference
                  </label>
                  <input
                    className="govuk-input govuk-!-width-full"
                    id="reference"
                    name="reference"
                    type="text"
                    defaultValue={searchParams?.reference || ""}
                  />
                </div>
              </div>
              <div className="govuk-grid-column-one-third">
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="govuk-input govuk-!-width-full"
                    id="address"
                    name="address"
                    type="text"
                    defaultValue={searchParams?.address || ""}
                  />
                </div>
              </div>
              <div className="govuk-grid-column-one-third">
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="postcode">
                    Postcode
                  </label>
                  <input
                    className="govuk-input govuk-!-width-full"
                    id="postcode"
                    name="postcode"
                    type="text"
                    defaultValue={searchParams?.postcode || ""}
                  />
                </div>
              </div>
            </div>

            {/* Description and dates */}
            <div className="govuk-grid-row average-bottom-margin">
              <div className="govuk-grid-column-one-third">
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="description">
                    Description
                  </label>
                  <input
                    className="govuk-input govuk-!-width-full"
                    id="description"
                    name="description"
                    type="text"
                    defaultValue={searchParams?.description || ""}
                  />
                </div>
              </div>
              <div className="govuk-grid-column-one-third">
                <label className="govuk-label" htmlFor="date5">
                  Received date
                </label>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date5"
                  name="date5"
                  type="date"
                  defaultValue={searchParams?.date5 || ""}
                />
                <p className="inline-block">to</p>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date6"
                  name="date6"
                  type="date"
                  defaultValue={searchParams?.date6 || ""}
                />
              </div>
              <div className="govuk-grid-column-one-third">
                <label className="govuk-label" htmlFor="date3">
                  Valid from date
                </label>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date3"
                  name="date3"
                  type="date"
                  defaultValue={searchParams?.date3 || ""}
                />
                <p className="inline-block">to</p>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date4"
                  name="date4"
                  type="date"
                  defaultValue={searchParams?.date4 || ""}
                />
              </div>
            </div>

            {/* More dates */}
            <div className="govuk-grid-row average-bottom-margin">
              <div className="govuk-grid-column-one-third">
                <label className="govuk-label" htmlFor="date7">
                  Published date
                </label>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date7"
                  name="date7"
                  type="date"
                  defaultValue={searchParams?.date7 || ""}
                />
                <p className="inline-block">to</p>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date8"
                  name="date8"
                  type="date"
                  defaultValue={searchParams?.date8 || ""}
                />
              </div>
              <div className="govuk-grid-column-one-third">
                <label className="govuk-label" htmlFor="date9">
                  Consultation end date
                </label>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date9"
                  name="date9"
                  type="date"
                  defaultValue={searchParams?.date9 || ""}
                />
                <p className="inline-block">to</p>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date10"
                  name="date10"
                  type="date"
                  defaultValue={searchParams?.date10 || ""}
                />
              </div>
              <div className="govuk-grid-column-one-third">
                <label className="govuk-label" htmlFor="date11">
                  Decision date
                </label>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date11"
                  name="date11"
                  type="date"
                  defaultValue={searchParams?.date11 || ""}
                />
                <p className="inline-block">to</p>
                <input
                  className="govuk-input govuk-input--width-5 inline-block"
                  id="date12"
                  name="date12"
                  type="date"
                  defaultValue={searchParams?.date12 || ""}
                />
              </div>
            </div>

            {/* Sort by */}
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-third">
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="sort">
                    Sort by
                  </label>
                  <select
                    className="govuk-select"
                    id="sort"
                    name="sort"
                    defaultValue={searchParams?.sort || "received_newest"}
                  >
                    <optgroup label="By received date">
                      <option value="received_newest">Newest to oldest</option>
                      <option value="received_oldest">Oldest to newest</option>
                    </optgroup>
                    <optgroup label="By decision date">
                      <option value="decision_newest">Newest to oldest</option>
                      <option value="decision_oldest">Oldest to newest</option>
                    </optgroup>
                    <optgroup label="By consultation end date">
                      <option value="consultation_newest">
                        Newest to oldest
                      </option>
                      <option value="consultation_oldest">
                        Oldest to newest
                      </option>
                    </optgroup>
                    <optgroup label="By status">
                      <option value="status_newest">
                        Most to least progressed
                      </option>
                      <option value="status_oldest">
                        Least to most progressed
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-quarter">
                <button className="govuk-button" type="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
        {response?.data?.data && response?.data?.data.length > 0 ? (
          <>
            <div>
              {response?.data?.data.map((application) => {
                return (
                  <ApplicationCard
                    key={application.application.reference}
                    council={council}
                    {...application}
                  />
                );
              })}
            </div>
            {response?.data?.pagination?.total_pages > 1 && (
              <Pagination
                currentPage={page - 1}
                totalItems={
                  response?.data?.pagination?.total_pages * resultsPerPage
                }
                itemsPerPage={resultsPerPage}
                totalPages={response?.data?.pagination?.total_pages}
                baseUrl={`/${council}/advanced-search`}
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
