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
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlanningApplicationDetailsDocuments from "@/app/[council]/[reference]/documents/page";

// Mock dependencies
jest.mock("@/config", () => ({
  getAppConfig: jest.fn(),
}));
jest.mock("@/actions/api", () => ({
  ApiV1: { documents: jest.fn() },
}));
jest.mock("@/lib/documents", () => ({
  validateSearchParams: jest.fn(() => ({})),
}));
jest.mock("@/components/PageMain", () => ({
  PageMain: ({ children }: any) => (
    <div data-testid="page-main">{children}</div>
  ),
}));
jest.mock("@/components/ContentError", () => ({
  ContentError: () => <div data-testid="content-error" />,
}));
jest.mock("@/components/PageApplicationDocuments", () => ({
  PageApplicationDocuments: (props: any) => (
    <div data-testid="page-application-documents">{JSON.stringify(props)}</div>
  ),
}));

const getAppConfig = require("@/config").getAppConfig;
const ApiV1 = require("@/actions/api").ApiV1;
const validateSearchParams = require("@/lib/documents").validateSearchParams;

describe("PlanningApplicationDetailsDocuments (page)", () => {
  const params = { council: "public-council-1", reference: "APP-123" };

  beforeEach(() => {
    jest.clearAllMocks();
    validateSearchParams.mockReturnValue({ foo: "bar" });
  });

  it("renders ContentError if appConfig.council is undefined", async () => {
    getAppConfig.mockReturnValue({ council: undefined });
    const result = await PlanningApplicationDetailsDocuments({
      params,
      searchParams: {},
    });
    render(result);
    expect(screen.getByTestId("content-error")).toBeInTheDocument();
  });

  it("renders ContentError if documentResponse is missing or not 200", async () => {
    getAppConfig.mockReturnValue({ council: { name: "Camden" } });
    ApiV1.documents.mockResolvedValueOnce(null);

    let result = await PlanningApplicationDetailsDocuments({
      params,
      searchParams: {},
    });
    render(result);
    expect(screen.getByTestId("content-error")).toBeInTheDocument();

    cleanup();

    ApiV1.documents.mockResolvedValueOnce({ status: { code: 500 } });

    result = await PlanningApplicationDetailsDocuments({
      params,
      searchParams: {},
    });
    render(result);
    expect(screen.getByTestId("content-error")).toBeInTheDocument();
  });

  it("renders PageApplicationDocuments with correct props on success", async () => {
    getAppConfig.mockReturnValue({ council: { name: "Camden" } });
    ApiV1.documents.mockResolvedValueOnce({
      status: { code: 200 },
      data: [{ title: "Doc 1" }],
      pagination: { totalResults: 1 },
    });

    const result = await PlanningApplicationDetailsDocuments({
      params,
      searchParams: {},
    });
    render(result);
    expect(
      screen.getByTestId("page-application-documents"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Doc 1/)).toBeInTheDocument();
  });
});
