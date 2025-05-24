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
import { GET } from "@/app/[council]/[reference]/comments/search/route";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// Mock dependencies
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("@/config", () => ({
  getAppConfig: jest.fn(() => ({})),
}));
jest.mock("@/lib/comments", () => ({
  validateSearchParams: jest.fn((_, params) => params),
}));
jest.mock("@/lib/search", () => ({
  filterSearchParams: jest.fn((params) => params),
}));
jest.mock("@/util/featureFlag", () => ({
  commentSearchFields: ["field1", "field2"],
}));

const getMockRequest = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return {
    nextUrl: {
      searchParams,
      pathname: "/council/reference/comments/search",
    },
  } as unknown as NextRequest;
};

describe("GET route", () => {
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
      foo: "bar",
      field1: "shouldRemove",
      field2: "shouldRemove",
    });
    await GET(req);
    // Should call filterSearchParams with correct excluded keys
    const { filterSearchParams } = require("@/lib/search");
    expect(filterSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams),
      expect.arrayContaining(["field1", "field2", "action"]),
    );
    // Should redirect to correct path (removes /search)
    expect(redirect).toHaveBeenCalledWith(
      expect.stringMatching(/^\/council\/reference\/comments\?/),
    );
  });

  it("does not filter search params if action is not 'clear'", async () => {
    const req = getMockRequest({
      council: "test-council-1",
      foo: "bar",
    });
    await GET(req);
    // Should not call filterSearchParams
    const { filterSearchParams } = require("@/lib/search");
    expect(filterSearchParams).not.toHaveBeenCalled();
    // Should redirect to correct path (removes /search)
    expect(redirect).toHaveBeenCalledWith(
      expect.stringMatching(/^\/council\/reference\/comments\?/),
    );
  });

  it("removes undefined values from query params", async () => {
    // Mock validateSearchParams to return an object with undefined values
    const { validateSearchParams } = require("@/lib/comments");
    validateSearchParams.mockReturnValue({
      foo: "bar",
      baz: undefined,
      council: "test-council-1",
    });
    const req = getMockRequest({
      council: "test-council-1",
      foo: "bar",
      baz: "",
    });
    await GET(req);
    // Should not include 'baz' in the query string
    expect(redirect).toHaveBeenCalledWith(expect.stringContaining("foo=bar"));
    expect(redirect).toHaveBeenCalledWith(expect.not.stringContaining("baz"));
  });
});
