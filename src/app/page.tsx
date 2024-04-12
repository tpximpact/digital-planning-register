"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { getApplicationsByCouncil, getApplicationById } from "../actions";
import Link from "next/link";
import { NextIcon, PreviewIcon } from "../../public/icons";
import { Data } from "../../util/type";
import Form from "@/components/form";

const resultsPerPage = 10;

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
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
  }

  // in the future it should change to byReferenceNumber
  async function searchById(event: any) {
    event.preventDefault();
    const data = await getApplicationById(idReference);
    setData([data] as Data[]);
    setMetaData(undefined);
  }
  return (
    <main style={{ overflowX: "auto" }}>
      {data.length > 0 && (
        <>
          <Form
            searchById={(event: any) => searchById(event)}
            setIdReference={setIdReference}
          />
          <div className="govuk-grid-row responsive-table-row responsive-table-header">
            {data.map((application: any, index: number) => (
              <div key={index} className="item">
                <div className="govuk-grid-column-one-quarter">
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Application Reference</h2>
                    <p className="govuk-body">
                      <a href={`/${application?.id}`} className="govuk-link">
                        {application.reference_in_full}
                      </a>
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
                    <p className="govuk-body">{`${format(new Date(application?.received_date), "dd MMM yyyy")}`}</p>
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
                  nextLabel={<NextIcon />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={4}
                  marginPagesDisplayed={1}
                  pageCount={metaData?.total_pages}
                  previousLabel={<PreviewIcon />}
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
    </main>
  );
}
