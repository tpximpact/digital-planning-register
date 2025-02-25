/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ArrowLink } from "@/components/govuk/Pagination/ArrowLink";

describe("ArrowLink", () => {
  it("Shows previous link", () => {
    const type = "prev";
    const blockLevel = false;
    const link = {
      href: "search",
      page: 99,
      searchParams: {
        resultsPerPage: 10,
        page: 100,
        query: "value",
      },
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__prev");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "prev");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "search?resultsPerPage=10&page=99&query=value",
    );
    expect(screen.getByRole("link")).toHaveTextContent("Previous page");

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--prev");
  });
  it("Shows next link", () => {
    const type = "next";
    const blockLevel = false;
    const link = {
      href: "search",
      page: 2,
      searchParams: {
        resultsPerPage: 10,
        page: 1,
        query: "value",
      },
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__next");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "next");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "search?resultsPerPage=10&page=2&query=value",
    );
    expect(screen.getByRole("link")).toHaveTextContent("Next page");

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--next");
  });
  it("Shows block previous link", () => {
    const type = "prev";
    const blockLevel = true;
    const link = {
      href: "prev-page",
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__prev");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "prev");
    expect(screen.getByRole("link")).toHaveAttribute("href", "prev-page");
    expect(screen.getByRole("link")).toHaveTextContent("Previous page");

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--prev");
  });
  it("Shows block next link", () => {
    const type = "next";
    const blockLevel = true;
    const link = {
      href: "next-page",
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__next");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "next");
    expect(screen.getByRole("link")).toHaveAttribute("href", "next-page");
    expect(screen.getByRole("link")).toHaveTextContent("Next page");

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--next");
  });
  it("Shows block previous link description", () => {
    const type = "prev";
    const blockLevel = true;
    const link = {
      labelText: "Applying for a provisional lorry or bus licence",
      href: "prev-page",
      page: 1,
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__prev");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "prev");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "prev-page?page=1",
    );
    expect(screen.getByRole("link")).toHaveTextContent("Previous page");
    expect(container).toHaveTextContent(
      "Previous page: Applying for a provisional lorry or bus licence",
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--prev");
  });
  it("Shows block next link description", () => {
    const type = "next";
    const blockLevel = true;
    const link = {
      labelText: "Driver CPC part 1 test: theory",
      href: "next-page",
      page: 2,
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__next");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "next");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "next-page?page=2",
    );
    expect(screen.getByRole("link")).toHaveTextContent("Next page");
    expect(container).toHaveTextContent(
      "Next page: Driver CPC part 1 test: theory",
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--next");
  });
});
