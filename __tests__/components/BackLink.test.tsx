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
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BackLink } from "@/components/BackLink";

// Mock next/router
const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

// Mock next/link to render a regular anchor for testing
jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({
    href,
    onClick,
    className,
    children,
  }: {
    href: string;
    onClick?: React.MouseEventHandler;
    className?: string;
    children: React.JSX.Element;
  }) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
});

describe("BackLink", () => {
  beforeEach(() => {
    mockBack.mockClear();
    // Reset js-enabled class for each test
    document.documentElement.className = "";
  });

  it("renders the back link when JS is enabled", () => {
    render(<BackLink />);
    expect(screen.getByRole("link", { name: /back/i })).toBeInTheDocument();
  });

  it("renders with the provided link", () => {
    render(<BackLink link="/foo" />);
    const link = screen.getByRole("link", { name: /back/i });
    expect(link).toHaveAttribute("href", "/foo");
  });

  it("renders with # when no link is provided", () => {
    render(<BackLink />);
    const link = screen.getByRole("link", { name: /back/i });
    expect(link).toHaveAttribute("href", "#");
  });

  it("calls router.back when clicked and no link is provided", () => {
    render(<BackLink />);
    const link = screen.getByRole("link", { name: /back/i });
    fireEvent.click(link);
    expect(mockBack).toHaveBeenCalled();
  });

  it("does not call router.back when a link is provided", () => {
    render(<BackLink link="/foo" />);
    const link = screen.getByRole("link", { name: /back/i });
    fireEvent.click(link);
    expect(mockBack).not.toHaveBeenCalled();
  });

  it("adds js-enabled class to documentElement", () => {
    render(<BackLink />);
    expect(document.documentElement.className).toContain("js-enabled");
  });
});
