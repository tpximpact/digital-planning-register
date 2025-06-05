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
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import PlanningApplicationDetails from "@/app/[council]/[reference]/page";

// Mock dependencies
jest.mock("@/config", () => ({
  getAppConfig: jest.fn(),
}));
jest.mock("@/actions/api", () => ({
  ApiV1: { show: jest.fn() },
}));
jest.mock("@/lib/dprAnalytics", () => ({
  trackServer: jest.fn(),
}));
jest.mock("@/components/PageMain", () => ({
  PageMain: ({ children }: any) => (
    <div data-testid="page-main">{children}</div>
  ),
}));
jest.mock("@/components/ContentError", () => ({
  ContentError: () => <div data-testid="content-error" />,
}));
jest.mock("@/components/PageShow", () => ({
  PageShow: (props: any) => (
    <div data-testid="page-show">{JSON.stringify(props)}</div>
  ),
}));

const getAppConfig = require("@/config").getAppConfig;
const ApiV1 = require("@/actions/api").ApiV1;
const trackServer = require("@/lib/dprAnalytics").trackServer;

describe("PlanningApplicationDetails (page)", () => {
  const params = { council: "public-council-1", reference: "APP-123" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ContentError if appConfig.council is undefined", async () => {
    getAppConfig.mockReturnValue({ council: undefined });
    ApiV1.show.mockResolvedValueOnce({
      status: { code: 200 },
      data: { foo: "bar" },
    });

    const result = await PlanningApplicationDetails({
      params,
      searchParams: {},
    });
    render(result);
    expect(screen.getByTestId("content-error")).toBeInTheDocument();
  });

  it("renders ContentError if applicationResponse is missing or not 200", async () => {
    getAppConfig.mockReturnValue({ council: { name: "Camden" } });
    ApiV1.show.mockResolvedValueOnce(null);

    let result = await PlanningApplicationDetails({ params, searchParams: {} });
    render(result);
    expect(screen.getByTestId("content-error")).toBeInTheDocument();

    cleanup();

    ApiV1.show.mockResolvedValueOnce({ status: { code: 500 }, data: null });

    result = await PlanningApplicationDetails({ params, searchParams: {} });
    render(result);
    expect(screen.getByTestId("content-error")).toBeInTheDocument();
  });

  it("renders PageShow and calls trackServer on success", async () => {
    getAppConfig.mockReturnValue({ council: { name: "Camden" } });
    ApiV1.show.mockResolvedValueOnce({
      status: { code: 200 },
      data: { title: "Doc 1" },
    });

    const result = await PlanningApplicationDetails({
      params,
      searchParams: { foo: "bar" },
    });
    render(result);
    expect(screen.getByTestId("page-show")).toBeInTheDocument();
    expect(screen.getByText(/Doc 1/)).toBeInTheDocument();
    expect(trackServer).toHaveBeenCalledWith(
      "siteNoticeTracking",
      expect.objectContaining({
        council: "public-council-1",
        reference: "APP-123",
        searchParams: expect.any(String),
      }),
    );
  });
});
