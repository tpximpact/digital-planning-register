import React from "react";
import Link from "next/link";
import { NextIcon, PreviousIcon } from "../../../public/icons";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  baseUrl: string;
  queryParams: Record<string, string>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  baseUrl,
  queryParams,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalItems > itemsPerPage;

  const buildUrl = (page: number) => {
    const query = { ...queryParams, page: String(page + 1) };
    return `${baseUrl}?${new URLSearchParams(query).toString()}`;
  };

  const renderPageLink = (page: number) => {
    return (
      <Link
        href={buildUrl(page)}
        className={`page-link ${currentPage === page ? "active-page" : ""}`}
      >
        {page + 1}
      </Link>
    );
  };

  const renderPreviousLink = () => {
    if (currentPage === 0) return null;
    return (
      <Link href={buildUrl(currentPage - 1)} className="page-link">
        <PreviousIcon />
      </Link>
    );
  };

  const renderNextLink = () => {
    if (currentPage === pageCount - 1) return null;
    return (
      <Link href={buildUrl(currentPage + 1)} className="page-link">
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
