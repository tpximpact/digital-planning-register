import React from "react";
import "./Pagination.scss";

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

export const Pagination = ({
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

export const PreviousIcon = () => {
  return (
    <div className="pagination-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        role="img"
        aria-label="Back arrow"
      >
        <path
          d="M6.893 13.125L8.3066 11.711L4.014 7.418L17 7.418V5.418L4.104 5.418L8.2895 1.4414L6.9125 -0.0078001L0.1684 6.3984L6.893 13.125Z"
          fill="#505A5F"
        />
      </svg>
      <p className="govuk-link ">
        <span className="govuk-pagination__prev pagination-next-previous">
          Previous
        </span>
      </p>
    </div>
  );
};

export const NextIcon = () => {
  return (
    <div className="pagination-icon">
      <p className="govuk-link">
        <span className="govuk-pagination__next pagination-next-previous">
          Next
        </span>
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        role="img"
        aria-label="Next arrow"
      >
        <path
          d="M8.107 -0.0078125L6.6934 1.40619L10.986 5.69919H-2V7.69919H10.896L6.7105 11.6758L8.0875 13.125L14.8316 6.71879L8.107 -0.0078125Z"
          fill="#505A5F"
        />
      </svg>
    </div>
  );
};
