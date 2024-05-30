import React from "react";
import { format } from "date-fns";
import { getApplicationsByCouncil, searchApplication } from "../../actions";
import Link from "next/link";
import { Data } from "../../../util/type";
import NoResult from "../../components/no-results";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/button";
import LandingMap from "@/components/landing_map";

const resultsPerPage = 10;

export default async function Home({
  params,
  searchParams,
}: {
  params: { council: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt(searchParams?.page as string) || 1;
  const search = searchParams?.search as string;
  const council = params.council;
  let isError = false;

  let data: Data[] | undefined;
  let totalPages: number = 0;

  if (search) {
    if (search.length < 3) {
      isError = true;
      const response = await getApplicationsByCouncil(
        page,
        resultsPerPage,
        council,
      );
      if (response.data) {
        data = response.data;
        totalPages = response.metadata?.total_pages || 1;
      } else {
        notFound();
      }
    } else {
      isError = false;
      const response = await searchApplication(
        search,
        council,
        page,
        resultsPerPage,
      );
      if (!response.error) {
        if (response.data === null) {
          notFound();
        } else {
          data = response.data;
          totalPages = response?.metadata?.total_pages || 1;
        }
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
      notFound();
    }
  }

  return (
    <>
      {!data && <BackLink />}
      <main className="govuk-main-wrapper">
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
                defaultValue={search || ""}
              />
              {isError && (
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
                        <h2 className="govuk-heading-s">
                          Application Reference
                        </h2>
                        <p className="govuk-body test">
                          {application.reference ||
                            application.application.reference}
                        </p>
                      </div>
                      <div className="govuk-grid-column-two-thirds">
                        <h2 className="govuk-heading-s">Address</h2>
                        <p className="govuk-body">
                          {application?.site?.address_1 ||
                            application?.property?.address?.singleLine}
                          {application?.site?.postcode &&
                            ", " + application?.site?.postcode}
                        </p>
                      </div>
                    </div>
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-one-third">
                        <LandingMap
                          boundary_geojson={application.boundary_geojson}
                        />
                      </div>
                      <div className="govuk-grid-column-two-thirds description">
                        <h2 className="govuk-heading-s">Description</h2>
                        <p className="govuk-body">
                          {application.description ||
                            application?.proposal?.description}
                        </p>
                      </div>
                    </div>
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-one-third">
                        <h2 className="govuk-heading-s">Application type</h2>
                        <p className="govuk-body">
                          {application?.application_type?.replace(/_/g, " ") ||
                            application?.application?.type?.description.replace(
                              /_/g,
                              " ",
                            )}
                        </p>
                      </div>

                      <div className="govuk-grid-column-one-third">
                        <h2 className="govuk-heading-s">Status</h2>
                        <p className="govuk-body">
                          {(application?.status &&
                            application?.status?.replace(/_/g, " ")) ||
                            (application?.application?.status &&
                              application?.application?.status.replace(
                                /_/g,
                                " ",
                              ))}
                        </p>
                      </div>

                      <div className="govuk-grid-column-one-third">
                        <h2 className="govuk-heading-s">Date submitted</h2>
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
                        <h2 className="govuk-heading-s">
                          Consultation End Date
                        </h2>
                        <p className="govuk-body">
                          {application?.consultation?.end_date &&
                            `${format(
                              new Date(application?.consultation?.end_date),
                              "dd-MM-yyyy",
                            )}`}
                        </p>
                      </div>
                      <div className="govuk-grid-column-one-third">
                        <h2 className="govuk-heading-s">Decision Date</h2>
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
                baseUrl={`/${council}/`}
                queryParams={searchParams as Record<string, string>}
              />
            )}
          </>
        ) : (
          <NoResult council={council} />
        )}
      </main>
    </>
  );
}
