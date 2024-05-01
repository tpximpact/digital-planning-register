"use client";
import React from "react";
import ReactPaginate from "react-paginate";
import { NextIcon, PreviousIcon } from "../../../public/icons";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (event: any) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalItems > itemsPerPage;

  const preview = currentPage === 0 ? "" : <PreviousIcon />;
  const next = currentPage === pageCount - 1 ? "" : <NextIcon />;

  return (
    <>
      {showPagination && (
        <div className="pagination-section">
          <ReactPaginate
            breakLabel="..."
            nextLabel={next}
            onPageChange={onPageChange}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            pageCount={pageCount}
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
  );
};

export default Pagination;
