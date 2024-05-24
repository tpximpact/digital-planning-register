import React from "react";
import { format } from "date-fns";
import { getApplicationsByCouncil, searchApplication } from "../../actions";
import Link from "next/link";
import { Data } from "../../../util/type";
import DesktopHeader from "../../components/desktop-header";
import NoResult from "../../components/no-results";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/button";

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

  let data: Data[] | undefined;
  let totalPages: number = 0;

  if (search) {
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
          <div className="govuk-grid-column-three-quarters">
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
            <DesktopHeader />
            <div className="govuk-grid-row responsive-table-row">
              {data?.map((application: any, index: number) => (
                <div key={index} className="item">
                  <div className="govuk-grid-column-one-quarter">
                    <div className="govuk-grid-column-one-half responsive-cell">
                      <h2 className="govuk-heading-s">Application Reference</h2>
                      <p className="govuk-body test">
                        <Link
                          href={`/${council}/${application?.reference || application?.application?.reference}`}
                          className="govuk-link"
                        >
                          {application.reference ||
                            application.application.reference}
                        </Link>
                      </p>
                    </div>
                    <div className="govuk-grid-column-one-half responsive-cell">
                      <h2 className="govuk-heading-s">Address</h2>
                      <p className="govuk-body">
                        {application?.site?.address_1 ||
                          application?.property?.address?.singleLine}
                        {application?.site?.postcode &&
                          ", " + application?.site?.postcode}
                      </p>
                    </div>
                  </div>
                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-grid-column-two-thirds responsive-cell">
                      <h2 className="govuk-heading-s">Description</h2>
                      <p className="govuk-body">
                        {application.description ||
                          application?.proposal?.description}
                      </p>
                    </div>
                    <div className="govuk-grid-column-one-third responsive-cell">
                      <h2 className="govuk-heading-s">Application type</h2>
                      <p className="govuk-body">
                        {application?.application_type?.replace(/_/g, " ") ||
                          application?.application?.type?.description.replace(
                            /_/g,
                            " ",
                          )}
                      </p>
                    </div>
                  </div>
                  <div className="govuk-grid-column-one-quarter">
                    <div className="govuk-grid-column-one-half responsive-cell">
                      <h2 className="govuk-heading-s">Date submitted</h2>
                      <p className="govuk-body">
                        {(application?.received_date &&
                          `${format(
                            new Date(application?.received_date),
                            "dd MMM yyyy",
                          )}`) ||
                          (application?.application?.receivedAt &&
                            `${format(
                              new Date(application?.application?.receivedAt),
                              "dd MMM yyyy",
                            )}`)}
                      </p>
                    </div>
                    <div className="govuk-grid-column-one-half responsive-cell">
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
                  </div>
                  <div className="govuk-grid-row responsive-table-row"></div>
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
