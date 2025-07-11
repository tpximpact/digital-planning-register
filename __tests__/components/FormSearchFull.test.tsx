/* eslint-disable @typescript-eslint/no-require-imports */
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
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FormSearchFull } from "@/components/FormSearchFull";
import { SearchParamsApplication } from "@/types";
import { AppConfig } from "@/config/types";

// Mocks
jest.mock("@/components/button", () => ({
  Button: ({ children, element, href, ...props }: Record<string, unknown>) =>
    element === "link" ? (
      <a href={href as string} {...props}>
        {children as React.ReactNode}
      </a>
    ) : (
      <button {...props}>{children as React.ReactNode}</button>
    ),
}));

jest.mock("@/components/InfoIcon", () => ({
  InfoIcon: ({
    href,
    ariaLabel,
    title,
    className,
  }: {
    href: string;
    ariaLabel: string;
    title: string;
    className?: string;
  }) => {
    const isPrimary = className?.includes("dpr-form-search-full__info-icon");
    return (
      <a
        data-testid={isPrimary ? "primary-info-icon" : "accordion-info-icon"}
        href={href}
        aria-label={ariaLabel}
        className={className}
      >
        {title}
      </a>
    );
  },
}));

jest.mock("@/util", () => ({
  capitalizeFirstLetter: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
}));

jest.mock("@/components/FormFieldApplicationDateRange", () => ({
  FormFieldApplicationDateRange: () => (
    <div data-testid="FormFieldApplicationDateRange"></div>
  ),
}));

jest.mock("@/components/DetailsCheckboxAccordion", () => ({
  DetailsCheckboxAccordion: ({
    title,
    name,
    content,
  }: {
    title: string;
    name: string;
    content?: React.ReactNode;
  }) => (
    <div data-testid="DetailsCheckboxAccordion">
      <label htmlFor={name}>{title}</label>
      {content}
      <input type="checkbox" id={name} name={name} />
    </div>
  ),
}));

const defaultSearchParams: SearchParamsApplication = {
  page: 1,
  resultsPerPage: 10,
  type: "full",
};

const mockAppConfig = {
  features: {
    applicationSearchFields: [
      "advancedSearch",
      "sortBy",
      "quickFilters",
      "query",
      "reference",
      "description",
      "applicationType",
      "applicationStatus",
      "councilDecision",
      "dateType",
      "dateRange",
      "dateRangeFrom",
      "dateRangeTo",
    ],
  },
} as AppConfig;

const emptyAppConfig = {
  features: { applicationSearchFields: [] },
} as unknown as AppConfig;

describe("FormSearchFull", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("Navigation", () => {
    it("renders 'Back to simple search' link", () => {
      render(
        <FormSearchFull
          councilSlug="test-council-1"
          searchParams={defaultSearchParams}
          appConfig={mockAppConfig}
        />,
      );
      const link = screen.getByRole("link", { name: /back to simple search/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test-council-1");
    });

    it("renders the primary help icon in header", () => {
      render(
        <FormSearchFull
          councilSlug="test-council-1"
          searchParams={defaultSearchParams}
          appConfig={mockAppConfig}
        />,
      );
      const primary = screen.getByTestId("primary-info-icon");
      expect(primary).toBeInTheDocument();
      expect(primary).toHaveAttribute("href", "/test-council-1/help");
      expect(primary).toHaveAttribute(
        "aria-label",
        "Get help understanding what everything here means",
      );
    });

    it("renders a help link in each accordion section", () => {
      render(
        <FormSearchFull
          councilSlug="test-council-1"
          searchParams={defaultSearchParams}
          appConfig={mockAppConfig}
        />,
      );

      const icons = screen.getAllByTestId("accordion-info-icon");
      expect(icons).toHaveLength(3);

      const hrefs = icons.map((icon) => icon.getAttribute("href"));
      expect(hrefs).toEqual(
        expect.arrayContaining([
          "/test-council-1/help/application-types",
          "/test-council-1/help/application-statuses",
          "/test-council-1/help/decisions#council-decisions",
        ]),
      );
    });

    it("renders a visually hidden title", () => {
      render(
        <FormSearchFull
          councilSlug="test-council-1"
          searchParams={defaultSearchParams}
          appConfig={mockAppConfig}
        />,
      );

      expect(
        screen.getByRole("heading", { name: "Full application search" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Full application search" }),
      ).toHaveClass("govuk-visually-hidden");
    });
  });

  describe("Form structure", () => {
    it("renders hidden type input ", () => {
      const { container } = render(
        <FormSearchFull
          councilSlug="test-council-1"
          searchParams={defaultSearchParams}
          appConfig={mockAppConfig}
        />,
      );
      const input = container.querySelector(
        'input[type="hidden"][name="type"]',
      );
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("value", "full");
    });

    it("renders as a form with hidden council input when action is set", () => {
      render(
        <FormSearchFull
          councilSlug="test-council-1"
          action="/test-council-1/search-form"
          searchParams={defaultSearchParams}
          appConfig={mockAppConfig}
        />,
      );
      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute("action", "/test-council-1/search-form");

      const input = screen
        .getByRole("form")
        .querySelector('input[type="hidden"][name="council"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("value", "test-council-1");

      expect(
        screen.getByRole("button", { name: "Search" }),
      ).toBeInTheDocument();
      // Clear button should not be present when action is set
      expect(
        screen.queryByRole("button", { name: "Clear search" }),
      ).not.toBeInTheDocument();
    });

    it("renders submit and clear buttons when action is not set", () => {
      render(
        <FormSearchFull
          councilSlug="test-council-1"
          searchParams={defaultSearchParams}
          appConfig={mockAppConfig}
        />,
      );
      expect(
        screen.getByRole("button", { name: "Search" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Clear search" }),
      ).toBeInTheDocument();
    });
  });

  describe("Search fields", () => {
    describe("reference and description", () => {
      it("renders reference and description fields if enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={mockAppConfig}
          />,
        );
        expect(
          screen.getByLabelText(/application reference/i),
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      });

      it("does not render reference/description fields if not enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={emptyAppConfig}
          />,
        );
        expect(
          screen.queryByLabelText(/application reference/i),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/description/i)).not.toBeInTheDocument();
      });

      it("populates reference and description fields if in searchParams", () => {
        const searchParams: SearchParamsApplication = {
          page: 1,
          resultsPerPage: 10,
          type: "full",
          reference: "12345",
          description: "Test description",
        };
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={searchParams}
            appConfig={mockAppConfig}
          />,
        );
        const referenceInput = screen.getByLabelText(/application reference/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        expect(referenceInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(referenceInput).toHaveValue("12345");
        expect(descriptionInput).toHaveValue("Test description");
      });
    });

    describe("applicationType", () => {
      it("renders applicationType fields if enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={mockAppConfig}
          />,
        );
        expect(
          screen.getByRole("checkbox", { name: /application type/i }),
        ).toBeInTheDocument();
      });

      it("does not render applicationType field if not enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={emptyAppConfig}
          />,
        );
        expect(
          screen.queryByLabelText(/application type/i),
        ).not.toBeInTheDocument();
      });
    });

    describe("applicationStatus", () => {
      it("renders applicationStatus fields if enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={mockAppConfig}
          />,
        );
        expect(
          screen.getByRole("checkbox", { name: /application status/i }),
        ).toBeInTheDocument();
      });

      it("does not render applicationStatus field if not enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={emptyAppConfig}
          />,
        );
        expect(
          screen.queryByLabelText(/application status/i),
        ).not.toBeInTheDocument();
      });
    });

    describe("councilDecision", () => {
      it("renders councilDecision fields if enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={mockAppConfig}
          />,
        );
        expect(
          screen.getByRole("checkbox", { name: /council decision/i }),
        ).toBeInTheDocument();
      });

      it("does not render councilDecision field if not enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={emptyAppConfig}
          />,
        );
        expect(
          screen.queryByLabelText(/council decision/i),
        ).not.toBeInTheDocument();
      });
    });

    describe("dateRange", () => {
      it("renders dateRange fields if enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={mockAppConfig}
          />,
        );
        expect(
          screen.getByTestId("FormFieldApplicationDateRange"),
        ).toBeInTheDocument();
      });

      it("does not render dateRange field if not enabled", () => {
        render(
          <FormSearchFull
            councilSlug="test-council-1"
            searchParams={defaultSearchParams}
            appConfig={emptyAppConfig}
          />,
        );
        expect(
          screen.queryByTestId("FormFieldApplicationDateRange"),
        ).not.toBeInTheDocument();
      });
    });
  });
});
