import React from "react";
import { format } from "date-fns";
import { getApplicationsByCouncil, getApplicationById } from "../actions";
import Link from "next/link";
import { Data } from "../../util/type";
import DesktopHeader from "../components/desktop-header";
import NoResult from "../components/no-results";
import Pagination from "@/components/pagination";

const resultsPerPage = 10;

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt(searchParams?.page as string) || 1;
  const search = searchParams?.search as string;

  let data: Data[] | undefined;
  let totalPages: number = 0;

  if (search) {
    const response = await getApplicationById(parseInt(search));
    if (!response.error) {
      data = [response];
      totalPages = 1;
    }
  } else {
    const response = await getApplicationsByCouncil(page, resultsPerPage);
    if (response.data) {
      data = response.data;
      totalPages = response.metadata?.total_pages || 1;
    }
  }

  return (
    <main className="govuk-main-wrapper">
      <form action="/" method="get">
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="search">
            Search by ID
          </label>
          <input
            className="govuk-input"
            id="search"
            name="search"
            type="text"
            defaultValue={search || ""}
          />
        </div>
        <button className="govuk-button" type="submit">
          Search
        </button>
      </form>
      {data && data.length > 0 ? (
        <>
          <DesktopHeader />
          <div className="govuk-grid-row responsive-table-row">
            {data.map((application: any, index: number) => (
              <div key={index} className="item">
                <div className="govuk-grid-column-one-quarter">
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Application Reference</h2>
                    <p className="govuk-body test">
                      <Link href={`/${application?.id}`} className="govuk-link">
                        {application.reference_in_full}
                      </Link>
                    </p>
                  </div>
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Address</h2>
                    <p className="govuk-body">
                      {application?.site?.address_1},{" "}
                      {application?.site?.postcode}
                    </p>
                  </div>
                </div>
                <div className="govuk-grid-column-one-half">
                  <div className="govuk-grid-column-two-thirds responsive-cell">
                    <h2 className="govuk-heading-s">Description</h2>
                    <p className="govuk-body">{application.description}</p>
                  </div>
                  <div className="govuk-grid-column-one-third responsive-cell">
                    <h2 className="govuk-heading-s">Application type</h2>
                    <p className="govuk-body">
                      {application?.application_type?.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <div className="govuk-grid-column-one-quarter">
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Date submitted</h2>
                    <p className="govuk-body">
                      {application?.created_at &&
                        `${format(
                          new Date(application?.created_at),
                          "dd MMM yyyy",
                        )}`}
                    </p>
                  </div>
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Status</h2>
                    <p className="govuk-body">
                      {application?.status &&
                        application?.status.replace(/_/g, " ")}
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
              baseUrl={search ? `/?search=${search}` : "/"}
            />
          )}
        </>
      ) : (
        <NoResult />
      )}
    </main>
  );
}
