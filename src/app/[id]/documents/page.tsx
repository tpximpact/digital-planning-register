"use client";
import { useEffect, useState } from "react";
import { getApplicationById } from "@/actions";
import ApplicationFile from "@/components/application_files";
import { BackLink } from "@/components/button";
import ReactPaginate from "react-paginate";
import { NextIcon, PreviewIcon } from "../../../../public/icons";

const resultsPerPage = 10;

export default function Documents({
  params: { id },
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<any>(undefined);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await getApplicationById(parseFloat(id as string));
      setData(response);
    })();
  }, [id]);

  const indexOfLastDocument = (currentPage + 1) * resultsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - resultsPerPage;
  const currentDocuments = data?.documents?.slice(
    indexOfFirstDocument,
    indexOfLastDocument,
  );

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const showPagination = data?.documents?.length > resultsPerPage;

  const preview = currentPage === 0 ? "" : <PreviewIcon />;
  const next =
    currentPage === Math.ceil(data?.documents?.length / resultsPerPage) - 1 ? (
      ""
    ) : (
      <NextIcon />
    );
  return (
    <div>
      <BackLink href="/" />
      {data && (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Application Reference</h2>
              <p className="govuk-body">{data.reference_in_full}</p>
            </div>

            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Address</h2>
              <div className="govuk-body">
                {data.site?.address_1 && <p>{data.site.address_1}</p>}
                {data.site?.address_2 && <p>{data.site.address_2}</p>}
                {data.site?.town && `${data.site.town}, `}
                {data.site?.county && `${data.site.county}, `}
                {data.site?.postcode}
              </div>
            </div>
          </div>
          <ApplicationFile
            {...data}
            id={id}
            showViewAllButton={false}
            documents={currentDocuments}
          />
          {showPagination && (
            <div className="pagination-section">
              <ReactPaginate
                breakLabel="..."
                nextLabel={next}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(data?.documents?.length / resultsPerPage)}
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
            </div>
          )}
        </>
      )}
    </div>
  );
}
