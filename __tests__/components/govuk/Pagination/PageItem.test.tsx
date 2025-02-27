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
import { PageItem } from "@/components/govuk/Pagination/PageItem";

describe("PageItem", () => {
  it("Shows a page number", () => {
    const page = {
      current: false,
      number: 1,
    };
    const link = "search";
    render(<PageItem page={page} link={link} />);
    const linkElement = screen.getByRole("link", { name: "Page 1" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("1");
    expect(linkElement).toHaveAttribute("href", "search?page=1");
  });
  it("Shows ... when filling in for numbers", () => {
    const page = {
      current: false,
      number: -1,
    };
    const link = "search";
    render(<PageItem page={page} link={link} />);
    const linkElement = screen.getByRole("listitem");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(/\u22EF|\u2026|\.\.\./);
    expect(linkElement).toHaveClass("govuk-pagination__item--ellipses");
  });
});
