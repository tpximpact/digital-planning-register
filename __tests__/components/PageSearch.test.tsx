import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PageSearch, PageSearchProps } from "@/components/PageSearch";
import { AppConfig } from "@/config/types";
import { DprPlanningApplication, DprPagination } from "@/types";
import { getAppConfig } from "@/config";
import {
  generateDprApplication,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { ApplicationCard } from "@/components/ApplicationCard";

jest.mock("@/components/button", () => ({
  BackLink: () => <div data-testid="back-link"></div>,
}));

jest.mock("@/components/FormSearch", () => ({
  FormSearch: () => <div data-testid="form-search"></div>,
}));

jest.mock("@/components/ApplicationCard", () => ({
  ApplicationCard: () => <div data-testid="application-card"></div>,
}));

jest.mock("@/components/Pagination", () => ({
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
        applications={generateNResults(5, generateDprApplication)}
        pagination={generatePagination(0, 100)}
        searchParams={undefined}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Recently published applications" }),
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
        applications={generateNResults(5, generateDprApplication)}
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

  it("renders a list of search results", async () => {
    render(
      <PageSearch
        appConfig={getAppConfig("public-council-1")}
        applications={undefined}
        pagination={generatePagination(0, 0)}
        searchParams={{ page: 1, resultsPerPage: 10, query: "noresultsplease" }}
      />,
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("back-link")).toBeInTheDocument();
    expect(screen.getByTestId("form-search")).toBeInTheDocument();
    expect(screen.getByTestId("content-no-result")).toBeInTheDocument();
    expect(screen.queryByTestId("application-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });
});
