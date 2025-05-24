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
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "@/app/[council]/search/page";

// Mock dependencies
jest.mock("@/config", () => ({
  getAppConfig: jest.fn(() => ({ council: "test-council-1" })),
}));
jest.mock("@/lib/planningApplication/search", () => ({
  validateSearchParams: jest.fn((_, params) => params),
}));
jest.mock("@/components/PageMain", () => ({
  PageMain: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-main">{children}</div>
  ),
}));
jest.mock("@/components/FormSearchFull", () => ({
  FormSearchFull: (props: any) => {
    // Only pass valid HTML attributes to the div
    const { councilSlug, action, children } = props;
    return (
      <div
        data-testid="form-search-full"
        data-council-slug={councilSlug}
        data-action={action}
        data-search-params={JSON.stringify(props.searchParams)}
      >
        {JSON.stringify(props.searchParams)}
        FormSearchFullMock
        {children}
      </div>
    );
  },
}));
jest.mock("@/lib/navigation", () => ({
  createPathFromParams: jest.fn(() => "/test-council-1/search-form"),
}));

describe("Page /[council]/search", () => {
  it("renders PageMain and FormSearchFull with correct props", async () => {
    const params = { council: "test-council-1" };
    const searchParams = { foo: "bar" };

    // @ts-ignore
    render(await Page({ params, searchParams }));

    expect(screen.getByTestId("page-main")).toBeInTheDocument();
    const form = screen.getByTestId("form-search-full");
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("data-council-slug", "test-council-1");
    expect(form).toHaveAttribute("data-action", "/test-council-1/search-form");
    expect(form).toHaveAttribute(
      "data-search-params",
      JSON.stringify(searchParams),
    );
  });

  it("calls getAppConfig and validateSearchParams with correct arguments", async () => {
    const { getAppConfig } = require("@/config");
    const {
      validateSearchParams,
    } = require("@/lib/planningApplication/search");
    const params = { council: "test-council-1" };
    const searchParams = { foo: "bar" };

    // @ts-ignore
    await Page({ params, searchParams });

    expect(getAppConfig).toHaveBeenCalledWith("test-council-1");
    expect(validateSearchParams).toHaveBeenCalledWith(
      expect.any(Object),
      searchParams,
    );
  });

  it("uses default searchParams if not provided", async () => {
    // @ts-ignore
    render(await Page({ params: { council: "test-council-1" } }));

    const form = screen.getByTestId("form-search-full");
    expect(form).toBeInTheDocument();
    expect(form).not.toHaveAttribute("data-search-params");
  });
});
