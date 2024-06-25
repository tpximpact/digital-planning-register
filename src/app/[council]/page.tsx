import React from "react";
import { format } from "date-fns";
import { getApplicationsByCouncil, searchApplication } from "../../actions";
import { Data } from "../../../util/type";
import NoResult from "../../components/no_results";
import Pagination from "@/components/pagination";
import { BackLink } from "@/components/button";
import LandingMap from "@/components/landing_map";
import NotFound from "../not-found";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { definedStatus } from "../../../util/formatStatus";
import ButtonDetails from "@/components/button_details";

const resultsPerPage = 10;

async function fetchData(
  params: { council: string },
  searchParams?: { [key: string]: string | string[] | undefined },
): Promise<{
  data?: Data[];
  totalPages: number;
  hasError?: boolean;
  errorMessage?: string;
  validationError?: boolean;
}> {
  const page = parseInt(searchParams?.page as string) || 1;
  const search = searchParams?.search as string;
  const council = params.council;
  let validationError = false;
  let data: Data[] = [];
  let totalPages: number = 0;
  let hasError = false;
  let errorMessage = "";

  if (search) {
    if (search.length < 3) {
      validationError = true;
      const response = await getApplicationsByCouncil(
        page,
        resultsPerPage,
        council,
      );
      if (response.data) {
        data = response.data;
        totalPages = response.metadata?.total_pages || 1;
      } else {
        hasError = true;
        errorMessage = response.message;
      }
    } else {
      validationError = false;
      const response = await searchApplication(
        search,
        council,
        page,
        resultsPerPage,
      );
      if (!response.error) {
        if (response.data === null) {
          hasError = true;
          errorMessage = "No applications found.";
        } else {
          data = response.data;
          totalPages = response?.metadata?.total_pages || 1;
        }
      } else {
        hasError = true;
        errorMessage = response.message;
      }
    }
  } else {
    const response = await getApplicationsByCouncil(
      page,
      resultsPerPage,
      council,
    );
    if (response.data) {
      data = response.data;
      totalPages = response.metadata?.total_pages || 1;
    } else {
      hasError = true;
      errorMessage = response.message;
    }
  }

  return { data, totalPages, hasError, errorMessage, validationError };
}
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { council: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { hasError, errorMessage } = await fetchData(params, searchParams);

  if (hasError) {
    return {
      title: "Error",
      description: errorMessage || "An error occurred",
    };
  }

  return {
    title: "Digital Planning Register",
    description: `${capitaliseWord(params.council)} planning applications`,
  };
}

export default async function Home({
  params,
  searchParams,
}: {
  params: { council: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { data, totalPages, hasError, errorMessage, validationError } =
    await fetchData(params, searchParams);
  const page = parseInt(searchParams?.page as string) || 1;
  const council = params.council;

  if (hasError) {
    return <NotFound params={params} />;
  }
  return (
    <>
      {!data && <BackLink href={`/${council}`} />}
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
        {data && data.length > 0 ? (
          <>
            <div>
              {data?.map((application: any, index: number) => (
                <div
                  key={index}
                  className="govuk-grid-row grid-row-extra-bottom-margin search-card"
                >
                  <div className="govuk-grid-column-full">
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-one-third">
                        <div className="govuk-heading-s">
                          Application Reference
                        </div>
                        <p className="govuk-body">
                          {application.reference ||
                            application.application.reference}
                        </p>
                      </div>
                      <div className="govuk-grid-column-two-thirds">
                        <div className="govuk-heading-s">Address</div>
                        <p className="govuk-body">
                          {application?.site?.address_1 ||
                            application?.property?.address?.singleLine}
                          {application?.site?.postcode &&
                            ", " + application?.site?.postcode}
                        </p>
                      </div>
                    </div>
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-one-third landing-map">
                        <LandingMap
                          boundary_geojson={
                            application?.boundary_geojson ||
                            application?.property?.boundary?.site
                          }
                        />
                      </div>
                      <div className="govuk-grid-column-two-thirds">
                        <div className="govuk-heading-s">Description</div>
                        <p className="govuk-body">
                          {application?.description ||
                            application?.proposal?.description}
                        </p>
                      </div>
                    </div>
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-one-third">
                        <div className="govuk-heading-s">Application type</div>
                        <p className="govuk-body">
                          {capitaliseWord(
                            application?.application_type?.replace(/_/g, " ") ||
                              application?.application?.type?.description.replace(
                                /_/g,
                                " ",
                              ),
                          )}
                        </p>
                      </div>

                      <div className="govuk-grid-column-one-third">
                        <div className="govuk-heading-s">Status</div>
                        <p className="govuk-body">
                          {(application?.status &&
                            definedStatus(
                              application?.status,
                              application?.consultation?.end_date,
                            )) ||
                            (application?.application?.status &&
                              definedStatus(
                                application?.application?.status,
                                application?.application?.consultation
                                  ?.end_date,
                              ))}
                        </p>
                      </div>

                      <div className="govuk-grid-column-one-third">
                        <div className="govuk-heading-s">Received date</div>
                        <p className="govuk-body">
                          {(application?.received_date &&
                            `${format(
                              new Date(application?.received_date),
                              "dd-MM-yyyy",
                            )}`) ||
                            (application?.application?.receivedAt &&
                              `${format(
                                new Date(application?.application?.receivedAt),
                                "dd-MM-yyyy",
                              )}`)}
                        </p>
                      </div>
                    </div>
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-one-third">
                        {/* <div className="govuk-heading-s">Published Date</div>
                        <p className="govuk-body">
                          {application?.consultation?.end_date &&
                            `${format(
                              new Date(application?.consultation?.end_date),
                              "dd-MM-yyyy",
                            )}`}
                        </p> */}
                      </div>
                      <div className="govuk-grid-column-one-third">
                        <div className="govuk-heading-s">Decision Date</div>
                        <p className="govuk-body">
                          {application?.determination_date &&
                            `${format(
                              new Date(application?.determination_date),
                              "dd-MM-yyyy",
                            )}`}
                        </p>
                      </div>
                    </div>

                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-one-third">
                        {/* <ButtonDetails
                          council={council}
                          reference={
                            application.reference ||
                            application?.application?.reference
                          }
                        /> */}
                        <a
                          href={`/${council}/${application?.reference || application?.application?.reference}`}
                          className="govuk-button govuk-button--secondary blue-button"
                        >
                          View details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={page - 1}
                totalItems={totalPages * resultsPerPage}
                itemsPerPage={resultsPerPage}
                totalPages={totalPages}
                baseUrl={`/${council}/`}
                queryParams={searchParams as Record<string, string>}
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
