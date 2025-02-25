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

// backbutton.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { BackButton } from "@/components/BackButton";
import "@testing-library/jest-dom";

describe("BackButton Component", () => {
  it("renders correctly with baseUrl", () => {
    render(<BackButton baseUrl="/previous-page" />);
    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/previous-page");
    expect(backButton).toHaveClass("govuk-back-link");
  });

  it("renders correctly with baseUrl and searchParams", () => {
    render(
      <BackButton
        baseUrl="/search"
        searchParams={{ query: "example", page: "2" }}
      />,
    );
    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/search?query=example&page=2");
  });

  it("includes additional className when provided", () => {
    render(<BackButton baseUrl="/home" className="custom-class" />);
    const backButton = screen.getByText("Back");
    expect(backButton).toHaveClass("custom-class");
  });

  it("renders with correct default props", () => {
    render(<BackButton baseUrl="/default" />);
    const backButton = screen.getByText("Back");
    expect(backButton).toHaveAttribute("href", "/default");
    expect(backButton).toHaveClass("govuk-back-link");
  });
});
