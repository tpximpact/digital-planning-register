"use client";
import { useEffect, useState } from "react";
import { getApplicationById } from "@/actions";
import ApplicationFile from "@/components/application_files";
import { BackLink } from "@/components/button";
import ReactPaginate from "react-paginate";
import { NextIcon, PreviewIcon } from "../../../../public/icons";
import ApplicationConsulteeComment from "@/components/application_consultee_comments";

export default function ConsulteeComments({
  params: { id },
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<any>(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const maxDisplayComments = 10;

  useEffect(() => {
    (async () => {
      const response = await getApplicationById(parseFloat(id as string));
      setData(response);
    })();
  }, [id]);

  const indexOfLastComment = (currentPage + 1) * maxDisplayComments;
  const indexOfFirstComment = indexOfLastComment - maxDisplayComments;
  const currentComments = data?.consultee_comments?.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const showPagination = data?.consultee_comments?.length > maxDisplayComments;

  const preview = currentPage === 0 ? "" : <PreviewIcon />;
  const next =
    currentPage ===
    Math.ceil(data?.consultee_comments?.length / maxDisplayComments) - 1 ? (
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
          <ApplicationConsulteeComment
            {...data}
            id={id}
            showViewAllButton={false}
            comments={currentComments}
            maxDisplayComments={maxDisplayComments}
          />
          {showPagination && (
            <div className="pagination-section">
              <ReactPaginate
                breakLabel="..."
                nextLabel={next}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(
                  data?.consultee_comments?.length / maxDisplayComments,
                )}
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
