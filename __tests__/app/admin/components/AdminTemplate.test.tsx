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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AdminTemplate } from "@/app/(private)/admin/components/AdminTemplate";

// Mock next/link to render a regular <a>
jest.mock("next/link", () => {
  return ({ href, children, className }: any) => (
    <a href={href} className={className} data-testid="nav-link">
      {children}
    </a>
  );
});

describe("AdminTemplate", () => {
  it("renders the title and description", () => {
    render(
      <AdminTemplate
        title="Test Admin"
        description={<span data-testid="desc">desc</span>}
      />,
    );
    expect(screen.getByText("Test Admin")).toBeInTheDocument();
    expect(screen.getByTestId("desc")).toBeInTheDocument();
  });

  it("renders mainSection and sidebarSection", () => {
    render(
      <AdminTemplate
        title="Test"
        mainSection={<div data-testid="main-section">Main</div>}
        sidebarSection={<div data-testid="sidebar-section">Sidebar</div>}
      />,
    );
    expect(screen.getByTestId("main-section")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-section")).toBeInTheDocument();
  });

  it("renders the back link if backUrl is a string", () => {
    render(<AdminTemplate title="Test" backUrl="/custom-back" />);
    const backLink = screen.getByRole("link", {
      name: /back to all councils/i,
    });
    expect(backLink).toHaveAttribute("href", "/custom-back");
  });

  it("does not render the back link if backUrl is false", () => {
    render(<AdminTemplate title="Test" backUrl={false} />);
    expect(
      screen.queryByRole("link", { name: /back to all councils/i }),
    ).not.toBeInTheDocument();
  });

  it("highlights the correct navigation item", () => {
    render(<AdminTemplate title="Test" active="Settings" />);
    const navLinks = screen.getAllByTestId("nav-link");
    const settingsLink = navLinks.find((link) =>
      link.textContent?.includes("Settings"),
    );
    expect(settingsLink?.className).toMatch(/govuk-!-font-weight-bold/);
  });

  it("does not highlight inactive navigation items", () => {
    render(<AdminTemplate title="Test" active="Settings" />);
    const navLinks = screen.getAllByTestId("nav-link");
    navLinks
      .filter((link) => !link.textContent?.includes("Settings"))
      .forEach((link) => {
        expect(link.className).not.toMatch(/govuk-!-font-weight-bold/);
      });
  });
});
