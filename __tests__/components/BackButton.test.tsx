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

// Mock next/link to render a regular anchor for testing
jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({
    href,
    className,
    children,
  }: {
    href: string | object;
    className?: string;
    children: React.JSX.Element;
  }) => (
    <a
      href={typeof href === "string" ? href : JSON.stringify(href)}
      className={className}
    >
      {children}
    </a>
  );
});

describe("BackButton Component", () => {
  it("renders correctly with baseUrl", () => {
    render(<BackButton baseUrl="/previous-page" />);
    const backButton = screen.getByRole("link", { name: /back/i });
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
    const backButton = screen.getByRole("link", { name: /back/i });
    // The href will be stringified as an object in our mock
    expect(backButton.getAttribute("href")).toContain('"pathname":"/search"');
    expect(backButton.getAttribute("href")).toContain(
      '"query":{"query":"example","page":"2"}',
    );
  });

  it("includes additional className when provided", () => {
    render(<BackButton baseUrl="/home" className="custom-class" />);
    const backButton = screen.getByText("Back");
    expect(backButton).toHaveClass("custom-class");
  });

  it("renders with # when no baseUrl is provided", () => {
    render(<BackButton baseUrl="" />);
    const backButton = screen.getByRole("link", { name: /back/i });
    expect(backButton).toHaveAttribute("href", "#");
  });

  it("renders with correct default props", () => {
    render(<BackButton baseUrl="/default" />);
    const backButton = screen.getByText("Back");
    expect(backButton).toHaveAttribute("href", "/default");
    expect(backButton).toHaveClass("govuk-back-link");
  });
});
