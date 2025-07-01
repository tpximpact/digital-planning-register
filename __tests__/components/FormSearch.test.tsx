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
import { FormSearch } from "@/components/FormSearch";
import { AppConfig } from "@/config/types";

// Mocks
jest.mock("@/components/button", () => ({
  Button: ({ children, element, href, ...props }: any) =>
    element === "link" ? (
      <a href={href} {...props}>
        {children}
      </a>
    ) : (
      <button {...props}>{children}</button>
    ),
}));
jest.mock("@/lib/navigation", () => ({
  createPathFromParams: jest.fn((params, suffix) =>
    params && params.council ? `/${params.council}/${suffix || ""}` : "/",
  ),
}));
jest.mock("@/components/govukDpr/Details", () => ({
  Details: ({ summaryText, text, open }: any) => (
    <details open={open} data-testid="details">
      <summary>{summaryText}</summary>
      {text}
    </details>
  ),
}));
jest.mock("@/lib/planningApplication/search", () => ({
  APPLICATION_DPR_FILTER_OPTIONS: ["inConsultation", "decided"],
}));
jest.mock("@/util", () => ({
  capitalizeFirstLetter: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  pascalToSentenceCase: (s: string) =>
    s.replace(/([A-Z])/g, " $1").toLowerCase(),
}));

const mockAppConfig = {
  features: {
    applicationSearchFields: ["advancedSearch", "quickFilters"],
  },
} as AppConfig;

describe("FormSearch", () => {
  it("renders the form", () => {
    render(
      <FormSearch
        params={{ council: "test-council-1" }}
        appConfig={mockAppConfig}
      />,
    );
    expect(
      screen.getByLabelText(/Search by application reference/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /search by application reference/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("renders as a <form> if action is provided", () => {
    render(
      <FormSearch
        params={{ council: "test-council-1" }}
        action="/test-council-1/search-form"
        appConfig={mockAppConfig}
      />,
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveAttribute(
      "action",
      "/test-council-1/search-form",
    );

    const input = screen
      .getByRole("form")
      .querySelector('input[type="hidden"][name="council"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("value", "test-council-1");
  });

  it("renders as a fragment if action is not provided", () => {
    render(
      <FormSearch
        params={{ council: "test-council-1" }}
        appConfig={mockAppConfig}
      />,
    );
    // Should not find a form element
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("sets the input defaultValue from searchParams", () => {
    render(
      <FormSearch
        params={{ council: "test-council-1" }}
        searchParams={{ query: "foo" } as any}
        appConfig={mockAppConfig}
      />,
    );
    expect(screen.getByRole("textbox")).toHaveValue("foo");
  });

  it("renders Advanced search button if advancedSearch is enabled", () => {
    render(
      <FormSearch
        params={{ council: "test-council-1" }}
        appConfig={mockAppConfig}
      />,
    );
    expect(
      screen.getByRole("link", { name: /advanced search/i }),
    ).toBeInTheDocument();
  });

  describe("quickFilters", () => {
    it("renders quick filters details if quickFilters is enabled", () => {
      render(
        <FormSearch
          params={{ council: "test-council-1" }}
          appConfig={mockAppConfig}
        />,
      );
      const details = screen.getByTestId("details");
      expect(details).toBeInTheDocument();
      expect(details).not.toHaveAttribute("open");
      expect(screen.getByText(/quick filters/i)).toBeInTheDocument();
      expect(screen.getByText(/in consultation/i)).toBeInTheDocument();
      expect(screen.getByText(/decided/i)).toBeInTheDocument();
    });

    it("shows checkmark for active quick filter and clear link and details box is open", () => {
      render(
        <FormSearch
          params={{ council: "test-council-1" }}
          searchParams={{ dprFilter: "inConsultation" } as any}
          appConfig={mockAppConfig}
        />,
      );
      expect(screen.getByText(/✔/)).toBeInTheDocument();
      expect(screen.getByText(/clear quick filters/i)).toBeInTheDocument();
      const details = screen.getByTestId("details");
      expect(details).toBeInTheDocument();
      expect(details).toHaveAttribute("open");
    });
  });
});
