import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "@/components/govuk/Pagination";

describe("Pagination", () => {
  const baseProps = {
    currentPage: 0,
    totalItems: 50,
    itemsPerPage: 10,
    baseUrl: "/",
    queryParams: {},
    totalPages: 6,
  };

  it("renders pagination links correctly", () => {
    render(<Pagination {...baseProps} />);
    const paginationLinks = screen.getAllByRole("link");
    expect(paginationLinks).toHaveLength(4);
  });

  it("highlights the active page link", () => {
    render(<Pagination {...baseProps} currentPage={2} />);
    const activePageLink = screen.getByText("3");
    expect(activePageLink).toHaveClass("active-page");
  });

  it("renders the previous link when not on the first page", () => {
    render(<Pagination {...baseProps} currentPage={1} />);
    const previousLink = screen.getByRole("link", { name: /previous/i });
    expect(previousLink).toBeInTheDocument();
  });

  it("does not render the previous link when on the first page", () => {
    render(<Pagination {...baseProps} />);
    const previousLink = screen.queryByRole("link", { name: /previous/i });
    expect(previousLink).not.toBeInTheDocument();
  });

  it("renders the next link when not on the last page", () => {
    render(<Pagination {...baseProps} />);
    const nextLink = screen.getByRole("link", { name: /next/i });
    expect(nextLink).toBeInTheDocument();
  });

  it("does not render the next link when on the last page", () => {
    render(<Pagination {...baseProps} currentPage={4} />);
    const nextLink = screen.queryByRole("link", { name: /next/i });
    expect(nextLink).not.toBeInTheDocument();
  });

  it("generates correct page URLs with query parameters", () => {
    render(
      <Pagination
        {...baseProps}
        baseUrl="/search"
        queryParams={{ q: "test", filter: "active" }}
      />,
    );
    const paginationLinks = screen.getAllByRole("link");
    expect(paginationLinks[0]).toHaveAttribute(
      "href",
      "/search?q=test&filter=active&page=1",
    );
    expect(paginationLinks[1]).toHaveAttribute(
      "href",
      "/search?q=test&filter=active&page=2",
    );
  });

  it("does not render pagination when there are no items", () => {
    render(<Pagination {...baseProps} totalItems={0} />);
    const paginationSection = screen.queryByTestId("pagination-section");
    expect(paginationSection).not.toBeInTheDocument();
  });
});
