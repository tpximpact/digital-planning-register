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
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PageSearch } from "@/components/PageSearch";
import { getAppConfig } from "@/config";
import { generatePagination } from "@mocks/dprApplicationFactory";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";

const {
  consultation,
  assessmentInProgress,
  planningOfficerDetermined,
  assessmentInCommittee,
  committeeDetermined,
} = generateExampleApplications();

const exampleApplications = [
  consultation,
  assessmentInProgress,
  planningOfficerDetermined,
  assessmentInCommittee,
  committeeDetermined,
];

jest.mock("@/components/FormSearch", () => ({
  FormSearch: () => <div data-testid="form-search"></div>,
}));

jest.mock("@/components/ApplicationCard", () => ({
  ApplicationCard: () => <div data-testid="application-card"></div>,
}));

jest.mock("@/components/govuk/Pagination", () => ({
  Pagination: () => <div data-testid="pagination"></div>,
}));

jest.mock("@/components/ContentNoResult", () => ({
  ContentNoResult: () => <div data-testid="content-no-result"></div>,
}));

describe("PageSearch Component", () => {
  it("renders a list of results", async () => {
    render(
      <PageSearch
        appConfig={getAppConfig("public-council-1")}
        applications={exampleApplications}
        pagination={generatePagination(0, 100)}
        searchParams={undefined}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Recently published applications",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("back-link")).not.toBeInTheDocument();
    expect(screen.getByTestId("form-search")).toBeInTheDocument();
    expect(screen.getAllByTestId("application-card")).toHaveLength(5);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("renders a list of search results", async () => {
    render(
      <PageSearch
        appConfig={getAppConfig("public-council-1")}
        applications={exampleApplications}
        pagination={generatePagination(0, 100)}
        searchParams={{ page: 1, resultsPerPage: 10, query: "search" }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Search results" }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("back-link")).not.toBeInTheDocument();
    expect(screen.getByTestId("form-search")).toBeInTheDocument();
    expect(screen.getAllByTestId("application-card")).toHaveLength(5);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("does not render a list of search results", async () => {
    render(
      <PageSearch
        appConfig={getAppConfig("public-council-1")}
        applications={[]}
        pagination={generatePagination(0, 0)}
        searchParams={{ page: 1, resultsPerPage: 10, query: "noresultsplease" }}
      />,
    );
    expect(screen.queryByRole("heading")).toBeInTheDocument();
    expect(screen.getByTestId("form-search")).toBeInTheDocument();
    expect(screen.getByTestId("content-no-result")).toBeInTheDocument();
    expect(screen.queryByTestId("application-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });
});
