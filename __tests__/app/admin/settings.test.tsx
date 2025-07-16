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
import Main from "@/app/(private)/admin/page";

// Mock next/link to render a regular <a>
jest.mock("next/link", () => {
  return ({ href, children, className }: any) => (
    <a href={href} className={className} data-testid="council-link">
      {children}
    </a>
  );
});

// Mock AdminTemplate to render its children and props for inspection
jest.mock("@/app/(private)/admin/components/AdminTemplate", () => ({
  AdminTemplate: ({
    title,
    active,
    backUrl,
    description,
    mainSection,
  }: any) => (
    <div>
      <h1>{title}</h1>
      <div data-testid="active">{active}</div>
      <div data-testid="backUrl">{String(backUrl)}</div>
      <div data-testid="description">{description}</div>
      <div data-testid="mainSection">{mainSection}</div>
    </div>
  ),
}));

// Mock getAppConfig to return predictable data
jest.mock("@/config", () => ({
  getAppConfig: () => ({
    councils: [
      {
        name: "Camden",
        slug: "camden",
        visibility: "public",
        dataSource: "source1",
      },
      {
        name: "Islington",
        slug: "islington",
        visibility: "private",
        dataSource: "source2",
      },
    ],
  }),
}));

describe("Admin Main Page", () => {
  it("renders the title and description", () => {
    render(<Main />);
    expect(
      screen.getByText("Digital Planning Register Admin"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/administrators to view and manage/i),
    ).toBeInTheDocument();
  });

  it("renders a table with all councils", () => {
    render(<Main />);
    expect(screen.getByText("Camden")).toBeInTheDocument();
    expect(screen.getByText("Islington")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // header + 2 councils
  });

  it("renders correct visibility tags", () => {
    render(<Main />);
    expect(screen.getByText("public")).toHaveClass("govuk-tag--green");
    expect(screen.getByText("private")).toHaveClass("govuk-tag--red");
  });

  it("renders correct data sources", () => {
    render(<Main />);
    expect(screen.getByText("source1")).toBeInTheDocument();
    expect(screen.getByText("source2")).toBeInTheDocument();
  });

  it("renders application links for each council", () => {
    render(<Main />);
    const links = screen.getAllByRole("link", { name: /View applications/i });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute(
      "href",
      "/admin/council/applications?council=camden",
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "/admin/council/applications?council=islington",
    );
  });

  it("does not render the back link", () => {
    render(<Main />);
    expect(screen.queryByText(/Back to all councils/i)).not.toBeInTheDocument();
  });
});
