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
import { PageSearch } from "@/components/PageSearch";
import { AppConfig } from "@/config/types";
import {
  ApiResponse,
  DprSearchApiResponse,
  SearchParamsApplication,
} from "@/types";
import { generatePagination } from "@mocks/dprApplicationFactory";
import { features } from "process";

// Mocks
jest.mock("@/components/FormSearch", () => ({
  FormSearch: (props: any) => <div data-testid="form-search" />,
}));
jest.mock("@/components/FormSearchFull", () => ({
  FormSearchFull: (props: any) => <div data-testid="form-search-full" />,
}));
jest.mock("@/components/ApplicationCard", () => ({
  ApplicationCard: (props: any) => <div data-testid="application-card" />,
}));
jest.mock("@/components/govuk/NotificationBanner", () => ({
  NotificationBanner: (props: any) => (
    <div data-testid="notification-banner">
      {props.title}
      {props.heading}
    </div>
  ),
}));
jest.mock("@/components/govuk/Pagination", () => ({
  Pagination: (props: any) => <div data-testid="pagination" />,
}));
jest.mock("@/components/ContentNoResult", () => ({
  ContentNoResult: (props: any) => <div data-testid="content-no-result" />,
}));
jest.mock("@/components/EmailSignUpButton", () => ({
  EmailSignUpButton: (props: any) => (
    <a data-testid="email-signup" href={props.href}>
      Sign up
    </a>
  ),
}));
jest.mock("@/components/FormApplicationsSort", () => ({
  FormApplicationsSort: (props: any) => (
    <div data-testid="form-applications-sort" />
  ),
}));
jest.mock("@/lib/navigation", () => ({
  createPathFromParams: jest.fn(() => "/search-form"),
}));
jest.mock("@/util", () => ({
  pascalToSentenceCase: (s: string) => s,
}));
jest.mock("@/lib/planningApplication/search", () => ({
  checkSearchPerformed: jest.fn(
    (params) => !!params && !!Object.keys(params).length && params.hasResults,
  ),
}));

jest.mock("@/components/ContentNotOnDprYet", () => ({
  ContentNotOnDprYet: (props: any) => (
    <div data-testid="content-not-on-dpr-yet" />
  ),
}));

const baseParams = { council: "camden" };
const mockAppConfig: AppConfig = {
  defaults: {
    resultsPerPage: 10,
  },
  features: {
    applicationSearchFields: ["sortBy"],
  },
} as unknown as AppConfig;
const baseSearchParams: SearchParamsApplication = {
  page: 1,
  resultsPerPage: 10,
  type: "simple",
};
const mockResponse: ApiResponse<DprSearchApiResponse> = {
  status: {
    code: 200,
    message: "OK",
  },
  data: [
    { data: { application: { reference: "A1" } } },
    { data: { application: { reference: "A2" } } },
  ] as DprSearchApiResponse,
  pagination: generatePagination(1, 100),
};

describe("PageSearch", () => {
  // there are some key visual difference between the four states of the page:
  // no actions performed, shows the welcome message and simple search form
  // simple search performed, shows the simple search form and results
  // dprFilter search performed, shows the quick filters, simple search form and results
  // advanced search performed, shows Scroll to results notification, the advanced search form and results

  // there are also some header differences naming and accessibility wise

  it("renders the form element and sort form", () => {
    render(
      <PageSearch
        params={baseParams}
        appConfig={mockAppConfig}
        searchParams={baseSearchParams}
        response={mockResponse}
      />,
    );
    const form = screen.getByRole("form", {});
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("action", "/search-form");
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveAttribute("aria-label", "Search applications");

    expect(screen.getByTestId("form-applications-sort")).toBeInTheDocument();
  });

  it("renders email sign up link button if council has email link", () => {
    const mockAppConfigWithLink: AppConfig = {
      ...mockAppConfig,
      council: {
        features: {
          alertsAllApplications: true,
        },
        pageContent: {
          email_alerts: {
            sign_up_for_alerts_link: "https://alerts.example.com",
          },
        },
      },
    } as unknown as AppConfig;
    render(
      <PageSearch
        params={baseParams}
        appConfig={mockAppConfigWithLink}
        searchParams={baseSearchParams}
        response={mockResponse}
      />,
    );
    expect(screen.getByTestId("email-signup")).toHaveAttribute(
      "href",
      "https://alerts.example.com",
    );
  });

  const checkForSimpleNoSearchHeader = (presence: boolean = true) => {
    expect(
      screen.queryByText(/Welcome to the Digital Planning Register/i) !== null,
    ).toBe(presence);
  };

  const checkForAdvancedResultsNotification = (presence: boolean = true) => {
    expect(screen.queryByTestId("notification-banner") !== null).toBe(presence);
  };

  const checkForSimpleSearchForm = (presence: boolean = true) => {
    expect(screen.queryByTestId("form-search") !== null).toBe(presence);
  };

  const checkForAdvancedSearchForm = (presence: boolean = true) => {
    expect(screen.queryByTestId("form-search-full") !== null).toBe(presence);
  };

  const checkForContentNotFoundOnDprYet = (presence: boolean = true) => {
    expect(screen.queryByTestId("content-not-on-dpr-yet") !== null).toBe(
      presence,
    );
  };

  const checkForContentNoResultAfterApplicationCards = () => {
    const cards = screen.getAllByTestId("application-card");
    const allContentNotOnDprYet = screen.getAllByTestId(
      "content-not-on-dpr-yet",
    );
    const pagination = screen.getByTestId("pagination");

    // Use the last ContentNotOnDprYet (the one after the last card)
    const contentNotOnDprYet =
      allContentNotOnDprYet[allContentNotOnDprYet.length - 1];

    // All should share the same parent
    expect(cards[cards.length - 1].parentElement).toBe(
      contentNotOnDprYet.parentElement,
    );
    expect(contentNotOnDprYet.parentElement).toBe(pagination.parentElement);

    const siblings = Array.from(contentNotOnDprYet.parentElement!.children);
    const lastCardIndex = siblings.indexOf(cards[cards.length - 1]);
    const contentIndex = siblings.indexOf(contentNotOnDprYet);
    const paginationIndex = siblings.indexOf(pagination);

    expect(lastCardIndex).toBeLessThan(contentIndex);
    expect(contentIndex).toBeLessThan(paginationIndex);
  };

  describe("When no actions have been performed", () => {
    it("should show welcome message", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={mockResponse}
        />,
      );
      checkForSimpleNoSearchHeader(true);
    });
    it("should have correct headings", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={mockResponse}
        />,
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Welcome to the Digital Planning Register",
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Recently published applications",
      );
    });
    it("should not show scroll to results notification", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={mockResponse}
        />,
      );
      checkForAdvancedResultsNotification(false);
    });
    it("should show simple search form", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={mockResponse}
        />,
      );
      checkForSimpleSearchForm(true);
    });
    it("should not show advanced search form", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={mockResponse}
        />,
      );
      checkForAdvancedSearchForm(false);
    });
    it("should show ContentNotOnDprYet component", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={mockResponse}
        />,
      );
      checkForContentNotFoundOnDprYet(true);
    });
    describe("and we view the last page of results", () => {
      const mockResponseLastPage = {
        ...mockResponse,
        pagination: generatePagination(10, 100),
      };
      it("should render ContentNotOnDprYet component between last ApplicationCard and Pagination", () => {
        render(
          <PageSearch
            params={baseParams}
            appConfig={mockAppConfig}
            searchParams={baseSearchParams}
            response={mockResponseLastPage}
          />,
        );
        checkForContentNoResultAfterApplicationCards();
      });
    });
  });

  describe("When a simple search has been performed", () => {
    const mockSimpleSearchParams: SearchParamsApplication = {
      ...baseSearchParams,
      hasResults: true,
    } as unknown as SearchParamsApplication;
    it("should not show welcome message", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockSimpleSearchParams}
          response={mockResponse}
        />,
      );
      checkForSimpleNoSearchHeader(false);
    });
    it("should have correct headings", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockSimpleSearchParams}
          response={mockResponse}
        />,
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Search results",
      );
    });
    it("should not show scroll to results notification", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockSimpleSearchParams}
          response={mockResponse}
        />,
      );
      checkForAdvancedResultsNotification(false);
    });
    it("should show simple search form", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockSimpleSearchParams}
          response={mockResponse}
        />,
      );
      checkForSimpleSearchForm(true);
    });
    it("should not show advanced search form", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockSimpleSearchParams}
          response={mockResponse}
        />,
      );
      checkForAdvancedSearchForm(false);
    });
    it("should not show ContentNotOnDprYet component", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockSimpleSearchParams}
          response={mockResponse}
        />,
      );
      checkForContentNotFoundOnDprYet(false);
    });
    describe("and we view the last page of results", () => {
      const mockResponseLastPage = {
        ...mockResponse,
        pagination: generatePagination(10, 100),
      };
      it("should render ContentNotOnDprYet component between last ApplicationCard and Pagination", () => {
        render(
          <PageSearch
            params={baseParams}
            appConfig={mockAppConfig}
            searchParams={mockSimpleSearchParams}
            response={mockResponseLastPage}
          />,
        );
        checkForContentNoResultAfterApplicationCards();
      });
    });
  });

  describe("When a quick filter has been performed", () => {
    const mockQuickfilterSearchParams: SearchParamsApplication = {
      ...baseSearchParams,
      dprFilter: "inConsultation",
      hasResults: true,
    } as unknown as SearchParamsApplication;
    it("should not show welcome message", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockQuickfilterSearchParams}
          response={mockResponse}
        />,
      );
      checkForSimpleNoSearchHeader(false);
    });
    it("should have correct headings", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockQuickfilterSearchParams}
          response={mockResponse}
        />,
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Applications inConsultation",
      );
    });
    it("should not show scroll to results notification", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockQuickfilterSearchParams}
          response={mockResponse}
        />,
      );
      checkForAdvancedResultsNotification(false);
    });
    it("should show simple search form", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockQuickfilterSearchParams}
          response={mockResponse}
        />,
      );
      checkForSimpleSearchForm(true);
    });
    it("should not show advanced search form", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockQuickfilterSearchParams}
          response={mockResponse}
        />,
      );
      checkForAdvancedSearchForm(false);
    });
    it("should not show ContentNotOnDprYet component", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockQuickfilterSearchParams}
          response={mockResponse}
        />,
      );
      checkForContentNotFoundOnDprYet(false);
    });
    describe("and we view the last page of results", () => {
      const mockResponseLastPage = {
        ...mockResponse,
        pagination: generatePagination(10, 100),
      };
      it("should render ContentNotOnDprYet component between last ApplicationCard and Pagination", () => {
        render(
          <PageSearch
            params={baseParams}
            appConfig={mockAppConfig}
            searchParams={mockQuickfilterSearchParams}
            response={mockResponseLastPage}
          />,
        );
        checkForContentNoResultAfterApplicationCards();
      });
    });
  });

  describe("When an advanced search search has been performed", () => {
    const mockAdvancedSearchParams: SearchParamsApplication = {
      ...baseSearchParams,
      type: "full",
      hasResults: true,
    } as unknown as SearchParamsApplication;
    it("should not show welcome message", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockAdvancedSearchParams}
          response={mockResponse}
        />,
      );
      checkForSimpleNoSearchHeader(false);
    });
    it("should have correct headings", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockAdvancedSearchParams}
          response={mockResponse}
        />,
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Search results",
      );
    });
    it("should show scroll to results notification", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockAdvancedSearchParams}
          response={mockResponse}
        />,
      );
      checkForAdvancedResultsNotification(true);
    });
    it("should not show simple search form", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockAdvancedSearchParams}
          response={mockResponse}
        />,
      );
      checkForSimpleSearchForm(false);
    });
    it("should show advanced search form", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockAdvancedSearchParams}
          response={mockResponse}
        />,
      );
      checkForAdvancedSearchForm(true);
    });
    it("should not show ContentNotOnDprYet component", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={mockAdvancedSearchParams}
          response={mockResponse}
        />,
      );
      checkForContentNotFoundOnDprYet(false);
    });
    describe("and we view the last page of results", () => {
      const mockResponseLastPage = {
        ...mockResponse,
        pagination: generatePagination(10, 100),
      };
      it("should render ContentNotOnDprYet component between last ApplicationCard and Pagination", () => {
        render(
          <PageSearch
            params={baseParams}
            appConfig={mockAppConfig}
            searchParams={mockAdvancedSearchParams}
            response={mockResponseLastPage}
          />,
        );
        checkForContentNoResultAfterApplicationCards();
      });
    });
  });

  describe("Managing results", () => {
    it("if results it shows a paginated list of applications", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={mockResponse}
        />,
      );

      expect(screen.getAllByTestId("application-card")).toHaveLength(2);
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });

    it("if no results it shows content not found message ", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={{
            ...mockResponse,
            data: null,
          }}
        />,
      );

      expect(screen.queryAllByTestId("application-card")).toHaveLength(0);
      expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
      expect(screen.getByTestId("content-no-result")).toBeInTheDocument();
    });
    it("if no results it shows ContentNotOnDprYet component", () => {
      render(
        <PageSearch
          params={baseParams}
          appConfig={mockAppConfig}
          searchParams={baseSearchParams}
          response={{
            ...mockResponse,
            data: null,
          }}
        />,
      );

      expect(
        screen.queryAllByTestId("content-not-on-dpr-yet").length,
      ).toBeGreaterThan(0);
    });
  });
});
