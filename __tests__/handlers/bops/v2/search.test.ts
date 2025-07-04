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

import { search } from "@/handlers/bops/v2/search";
import { handleBopsGetRequest } from "@/handlers/bops/requests";
import { convertBopsToDpr } from "@/handlers/bops/converters/planningApplication";
import {
  isDprApplication,
  convertToDprApplication,
} from "@/lib/planningApplication/converter";

// Mock dependencies
jest.mock("@/handlers/bops/requests");
jest.mock("@/handlers/bops/converters/planningApplication");
jest.mock("@/lib/planningApplication/converter");
jest.mock("@/handlers/lib", () => ({
  defaultPagination: {
    resultsPerPage: 0,
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    totalAvailableItems: 0,
  },
}));

const mockHandleBopsGetRequest = handleBopsGetRequest as jest.Mock;
const mockConvertBopsToDpr = convertBopsToDpr as jest.Mock;
const mockIsDprApplication = isDprApplication as unknown as jest.Mock;
const mockConvertToDprApplication = convertToDprApplication as jest.Mock;
const logErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
const logWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

describe("search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null data if no applications are found", async () => {
    mockHandleBopsGetRequest.mockResolvedValue({
      data: { metadata: {}, data: [] },
    });

    const result = await search("council-slug");
    expect(result.data).toBeNull();
    expect(result.pagination).toBeDefined();
  });

  it("should convert and return applications", async () => {
    const fakeApp = { application: { reference: "ref1" } };
    mockHandleBopsGetRequest.mockResolvedValue({
      data: { metadata: { results: 1 }, data: [fakeApp] },
    });
    mockConvertBopsToDpr.mockReturnValue(fakeApp);
    mockIsDprApplication.mockReturnValue(true);

    const result = await search("council-slug");
    expect(result.data).toHaveLength(1);
    expect(result.data?.[0]).toEqual(fakeApp);
    expect(result.pagination).toBeDefined();
  });

  it("should convert non-DprApplication using convertToDprApplication", async () => {
    const fakeApp = { application: { reference: "ref2" } };
    const convertedApp = { ...fakeApp, converted: true };
    mockHandleBopsGetRequest.mockResolvedValue({
      data: { metadata: { results: 1 }, data: [fakeApp] },
    });
    mockConvertBopsToDpr.mockReturnValue(fakeApp);
    mockIsDprApplication.mockReturnValue(false);
    mockConvertToDprApplication.mockReturnValue(convertedApp);

    const result = await search("council-slug");
    expect(result.data?.[0]).toEqual(convertedApp);
  });

  it("should handle conversion errors gracefully", async () => {
    const fakeApp = { application: { reference: "ref3" } };
    mockHandleBopsGetRequest.mockResolvedValue({
      data: { metadata: { results: 1 }, data: [fakeApp] },
    });
    mockConvertBopsToDpr.mockReturnValue(fakeApp);
    mockIsDprApplication.mockReturnValue(false);
    mockConvertToDprApplication.mockImplementation(() => {
      throw new Error("fail");
    });

    const result = await search("council-slug");
    expect(logErrorSpy).toHaveBeenCalled();
    expect(logWarnSpy).toHaveBeenCalled();
    expect(result.data).toBeNull();
  });

  it("should build URL with searchParams", async () => {
    mockHandleBopsGetRequest.mockResolvedValue({
      data: { metadata: {}, data: [] },
    });
    await search("council-slug", {
      page: 2,
      resultsPerPage: 5,
      query: "foo",
      type: "full",
      sortBy: "receivedAt",
      orderBy: "desc",
      dprFilter: "inConsultation",
      reference: "ref",
      description: "desc",
      applicationType: "type",
      applicationStatus: "status",
      councilDecision: "decision",
      dateType: "receivedAt",
      dateRange: "week",
    });
    expect(mockHandleBopsGetRequest).toHaveBeenCalled();
    const urlArg = mockHandleBopsGetRequest.mock.calls[0][1];
    expect(urlArg).toContain("page=2");
    expect(urlArg).toContain("maxresults=5");
    expect(urlArg).toContain("q=foo");
    expect(urlArg).toContain("sortBy=receivedAt");
    expect(urlArg).toContain("orderBy=desc");
    expect(urlArg).toContain("reference=ref");
    expect(urlArg).toContain("description=desc");
    expect(urlArg).toContain("applicationType=type");
    expect(urlArg).toContain("applicationStatus=status");
    expect(urlArg).toContain("councilDecision=decision");
    expect(urlArg).toMatch(/receivedAtFrom=\d{4}-\d{2}-\d{2}/);
    expect(urlArg).toMatch(/receivedAtTo=\d{4}-\d{2}-\d{2}/);
  });
});
