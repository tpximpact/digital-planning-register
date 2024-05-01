import React from "react";
import Link from "next/link";
import { NextIcon, PreviousIcon } from "../../../public/icons";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  baseUrl: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  baseUrl,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalItems > itemsPerPage;

  const renderPageLink = (page: number) => {
    return (
      <Link
        href={`${baseUrl}?page=${page + 1}`}
        className={`page-link ${currentPage === page ? "active-page" : ""}`}
      >
        {page + 1}
      </Link>
    );
  };

  const renderPreviousLink = () => {
    if (currentPage === 0) return null;
    return (
      <Link href={`${baseUrl}?page=${currentPage}`} className="page-link">
        <PreviousIcon />
      </Link>
    );
  };

  const renderNextLink = () => {
    if (currentPage === pageCount - 1) return null;
    return (
      <Link href={`${baseUrl}?page=${currentPage + 2}`} className="page-link">
        <NextIcon />
      </Link>
    );
  };

  return (
    <>
      {showPagination && (
        <div className="pagination-section">
          {renderPreviousLink()}
          {Array.from({ length: pageCount }, (_, index) =>
            renderPageLink(index),
          )}
          {renderNextLink()}
        </div>
      )}
    </>
  );
};

export default Pagination;
