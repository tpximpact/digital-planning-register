"use client";
import { useEffect, useState } from "react";
import { getApplicationById } from "@/actions";
import { BackLink } from "@/components/button";
import ReactPaginate from "react-paginate";
import { NextIcon, PreviewIcon } from "../../../../public/icons";
import ApplicationComments from "@/components/application_comments";
import ApplicationHeader from "@/components/application_header";

export default function Comments({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { type?: string };
}) {
  const [data, setData] = useState<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const maxDisplayComments = 10;

  useEffect(() => {
    (async () => {
      const response = await getApplicationById(parseFloat(id as string));
      setData(response);
    })();
  }, [id]);

  const type = searchParams?.type ?? "published";
  const commentsType = type === "consultee" ? "consultee" : "published";
  const comments =
    commentsType === "consultee"
      ? data?.consultee_comments
      : data?.published_comments;

  const indexOfLastComment = (currentPage + 1) * maxDisplayComments;
  const indexOfFirstComment = indexOfLastComment - maxDisplayComments;
  const currentComments = comments?.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const showPagination = (comments?.length ?? 0) > maxDisplayComments;
  const preview = currentPage === 0 ? "" : <PreviewIcon />;
  const next =
    currentPage === Math.ceil(comments?.length / maxDisplayComments) - 1 ? (
      ""
    ) : (
      <NextIcon />
    );
  return (
    <div>
      <BackLink href="/" />
      {data && (
        <>
          <ApplicationHeader
            reference={data.reference_in_full}
            address={data.site}
          />
          <ApplicationComments
            {...data}
            id={id}
            maxDisplayComments={10}
            showViewAllButton={false}
            type={type}
            comments={currentComments}
          />
          {showPagination && (
            <div className="pagination-section">
              <ReactPaginate
                breakLabel="..."
                nextLabel={next}
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(
                  (comments?.length ?? 0) / maxDisplayComments,
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
