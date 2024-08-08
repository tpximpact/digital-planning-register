import React from "react";
import { NextIcon, PreviousIcon } from "../../../public/icons";

/**
 * @todo queryParams should be a type
 */
interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  baseUrl: string;
  queryParams: any;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  baseUrl,
  queryParams,
  totalPages,
}: PaginationProps) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalItems > itemsPerPage;

  const buildUrl = (page: number) => {
    const query = { ...queryParams, page: String(page + 1) };
    return `${baseUrl}?${new URLSearchParams(query).toString()}`;
  };

  const pageDisplay = (page: number, current: number, totalPages: number) => {
    if (
      page + 1 === 1 ||
      page + 1 === current ||
      page + 1 === current + 1 ||
      page + 1 === current + 2 ||
      current === totalPages ||
      page + 1 === totalPages
    ) {
      return (
        <a
          href={buildUrl(page)}
          key={page}
          className={`govuk-link--no-visited-state page-link ${currentPage === page ? "active-page" : ""}`}
        >
          {page + 1}
        </a>
      );
    } else if (current + 3 === page + 1 || current - 1 === page + 1) {
      return (
        <a
          key={page}
          href={buildUrl(page)}
          className={`govuk-link--no-visited-state ${currentPage === page ? "active-page" : ""}`}
        >
          ...
        </a>
      );
    } else {
      return;
    }
  };
  const renderPageLink = (page: number) => {
    return pageDisplay(page, currentPage, totalPages);
  };

  const renderPreviousLink = () => {
    if (currentPage === 0) return null;
    return (
      <a href={buildUrl(currentPage - 1)} className="page-link">
        <PreviousIcon />
      </a>
    );
  };

  const renderNextLink = () => {
    if (currentPage === pageCount - 1) return null;
    return (
      <a href={buildUrl(currentPage + 1)} className="page-link">
        <NextIcon />
      </a>
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
