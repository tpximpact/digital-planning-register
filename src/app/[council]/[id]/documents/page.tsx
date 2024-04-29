"use client";
import { useEffect, useState } from "react";
import { getApplicationById } from "@/actions";
import ApplicationFile from "@/components/application_files";
import { BackLink } from "@/components/button";
import ReactPaginate from "react-paginate";
import { NextIcon, PreviousIcon } from "../../../../../public/icons";
import ApplicationHeader from "@/components/application_header";

export default function Documents({
  params: { id, council },
}: {
  params: { id: string; council: string };
}) {
  const [data, setData] = useState<any>(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const maxDisplayDocuments = 10;

  useEffect(() => {
    (async () => {
      const response = await getApplicationById(
        parseFloat(id as string),
        council,
      );
      setData(response);
    })();
  }, [council, id]);

  const indexOfLastDocument = (currentPage + 1) * maxDisplayDocuments;
  const indexOfFirstDocument = indexOfLastDocument - maxDisplayDocuments;
  const currentDocuments = data?.documents?.slice(
    indexOfFirstDocument,
    indexOfLastDocument,
  );

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const showPagination = data?.documents?.length > maxDisplayDocuments;

  const preview = currentPage === 0 ? "" : <PreviousIcon />;
  const next =
    currentPage ===
    Math.ceil(data?.documents?.length / maxDisplayDocuments) - 1 ? (
      ""
    ) : (
      <NextIcon />
    );
  return (
    <div>
      <BackLink href={`/${id}`} />
      {data && (
        <>
          <ApplicationHeader
            reference={data.reference_in_full}
            address={data.site}
          />
          <ApplicationFile
            {...data}
            id={id}
            showViewAllButton={false}
            documents={currentDocuments}
            maxDisplayDocuments={maxDisplayDocuments}
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
                  data?.documents?.length / maxDisplayDocuments,
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
