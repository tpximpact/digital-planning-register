"use client";
import { useEffect, useState } from "react";
import { getApplicationById } from "@/actions";
import ApplicationFile from "@/components/application_files";
import { BackLink } from "@/components/button";
import ReactPaginate from "react-paginate";
import { NextIcon, PreviousIcon } from "../../../../public/icons";
import ApplicationHeader from "@/components/application_header";
import Pagination from "@/components/pagination";

export default function Documents({
  params: { id },
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<any>(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const maxDisplayDocuments = 10;

  useEffect(() => {
    (async () => {
      const response = await getApplicationById(parseFloat(id as string));
      setData(response);
    })();
  }, [id]);

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
              <Pagination
                currentPage={currentPage}
                totalItems={data?.documents?.length}
                itemsPerPage={maxDisplayDocuments}
                onPageChange={handlePageClick}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
