"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { getApplicationsByCouncil, getApplicationById } from "../actions";
import Link from "next/link";
import { NextIcon, PreviewIcon } from "../../public/icons";
import { Data } from "../../util/type";
import Form from "@/components/form";
import DesktopHeader from "@/components/desktop-header";
import NoResult from "./no-results/page";

const resultsPerPage = 10;

export default function Home() {
  const [data, setData] = useState<Data[] | undefined>([]);
  const [metaData, setMetaData] = useState<any>(undefined);
  const [idReference, setIdReference] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const response = await getApplicationsByCouncil(1, resultsPerPage);
      setData(response.data);
      setMetaData(response.metadata);
      console.log({ response });
    })();
  }, []);

  async function handlePageClick(event: any) {
    const response = await getApplicationsByCouncil(
      event.selected + 1,
      resultsPerPage,
    );
    setData(response.data);
    setMetaData(response.metadata);
  }

  // in the future it should change to byReferenceNumber
  async function searchById(event: any) {
    event.preventDefault();
    const data = await getApplicationById(idReference);

    if (!data.error) {
      setData([data] as Data[]);
      setMetaData(undefined);
    } else {
      setData(undefined);
      console.log("no data");
    }
  }

  const preview = metaData?.page === 1 ? "" : <PreviewIcon />;
  const next = metaData?.page === 54 ? "" : <NextIcon />;

  return (
    <main className="govuk-width-container">
      <Form
        searchById={(event: any) => searchById(event)}
        setIdReference={setIdReference}
      />
      {data && data?.length > 0 && (
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
                    <p className="govuk-body">{`${format(new Date(application?.created_at), "dd MMM yyyy")}`}</p>
                  </div>
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Status</h2>
                    <p className="govuk-body">
                      {application?.status.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <div className="govuk-grid-row responsive-table-row"></div>
              </div>
            ))}
          </div>
          <section className="pagination-section">
            {metaData?.total_pages > 1 && (
              <>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={next}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={4}
                  marginPagesDisplayed={1}
                  pageCount={metaData?.total_pages}
                  previousLabel={preview}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active-page"
                  renderOnZeroPageCount={null}
                />
              </>
            )}
          </section>
        </>
      )}
      {data === undefined && <NoResult />}
    </main>
  );
}
