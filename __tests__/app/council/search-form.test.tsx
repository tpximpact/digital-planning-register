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

/**
 * @jest-environment node
 */
import { GET } from "@/app/[council]/search-form/route";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// Mocks
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("@/config", () => ({
  getAppConfig: jest.fn(() => ({})),
}));
jest.mock("@/lib/planningApplication/search", () => ({
  validateSearchParams: jest.fn((_, params) => params),
}));
jest.mock("@/lib/search", () => ({
  filterSearchParams: jest.fn((params) => params),
}));
jest.mock("@/util/featureFlag", () => ({
  applicationSearchFields: ["foo", "bar"],
}));

const getMockRequest = (
  params: Record<string, string> | URLSearchParams,
  pathname = "/council/search-form",
) => {
  const searchParams = new URLSearchParams(params);
  return {
    nextUrl: {
      searchParams,
      pathname,
    },
  } as unknown as NextRequest;
};

describe("GET /search-form route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to /not-found if council param is missing", async () => {
    await GET(getMockRequest({}));
    expect(redirect).toHaveBeenCalledWith("/not-found");
  });

  it("filters search params if action is 'clear'", async () => {
    const req = getMockRequest({
      council: "test-council-1",
      action: "clear",
      foo: "removeMe",
      bar: "removeMeToo",
      keep: "yes",
    });
    await GET(req);
    const { filterSearchParams } = require("@/lib/search");
    expect(filterSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams),
      expect.arrayContaining(["foo", "bar", "action"]),
    );
  });

  it("removes resultsPerPage from query params", async () => {
    const {
      validateSearchParams,
    } = require("@/lib/planningApplication/search");
    validateSearchParams.mockReturnValue({
      council: "test-council-1",
      keep: "yes",
      resultsPerPage: 25,
      another: "ok",
    });
    const req = getMockRequest({
      council: "test-council-1",
      keep: "yes",
      resultsPerPage: "25",
      another: "ok",
    });
    await GET(req);
    // Should not include resultsPerPage in the query string
    expect(redirect).toHaveBeenCalledWith(expect.stringContaining("keep=yes"));
    expect(redirect).toHaveBeenCalledWith(
      expect.stringContaining("another=ok"),
    );
    expect(redirect).not.toHaveBeenCalledWith(
      expect.stringContaining("resultsPerPage"),
    );
  });

  it("redirects to correct path with filtered query params", async () => {
    const req = getMockRequest(
      {
        council: "test-council-1",
        keep: "yes",
        another: "ok",
      },
      "/council/search-form",
    );
    await GET(req);
    expect(redirect).toHaveBeenCalledWith(
      expect.stringMatching(/^\/council\?(.+&)?keep=yes(&.+)?/),
    );
  });

  it.skip("combines duplicate searchParams into unique comma separated list", async () => {
    const req = getMockRequest(
      new URLSearchParams([
        ["council", "test-council-1"],
        ["keep", "yes"],
        ["another", "ok"],
        ["keep", "bar"],
        ["keep", "bar"],
        ["keep", "baz"],
      ]),
      "/council/search-form",
    );
    await GET(req);

    expect(redirect).toHaveBeenCalledWith(
      expect.stringMatching(/\/council\?(?:.*&)?keep=yes%2Cbar%2Cbaz(?:&.*)?/),
    );
  });
});
