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

import { specialistComments } from "@/handlers/local/v1/specialistComments";
import { getAppConfig } from "@/config";
import {
  generateNResults,
  generateComment,
  generatePagination,
} from "../../../../__mocks__/dprApplicationFactory";

jest.mock("@/config");
jest.mock("../../../../__mocks__/dprApplicationFactory");

const mockGetAppConfig = getAppConfig as jest.Mock;
const mockGenerateNResults = generateNResults as jest.Mock;
const mockGenerateComment = generateComment as jest.Mock;
const mockGeneratePagination = generatePagination as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockGetAppConfig.mockReturnValue({
    defaults: { resultsPerPage: 2 },
  });
  mockGenerateComment.mockImplementation(() => ({
    comment: "A comment",
    sentiment: "supportive",
  }));
  mockGenerateNResults.mockImplementation((n, fn) =>
    Array.from({ length: n }, fn),
  );
  mockGeneratePagination.mockImplementation(
    (
      currentPage: number,
      totalResults: number,
      totalAvailableItems: number,
      resultsPerPage: number,
    ) => ({
      resultsPerPage,
      currentPage,
      totalPages: Math.ceil(totalResults / resultsPerPage),
      totalResults,
      totalAvailableItems,
    }),
  );
});

describe("specialistComments", () => {
  it("returns paginated comments and summary", async () => {
    const result = await specialistComments("public-council-1", "APP-123", {
      page: 1,
      resultsPerPage: 2,
      type: "specialist",
    });
    expect(result.data?.comments).toHaveLength(2);
    expect(result.data?.summary.totalComments).toBe(20); // 2 * 10
    expect(result.data?.summary.totalConsulted).toBe(15); // 2 * 10 - 5
    expect(result.pagination).toEqual({
      currentPage: 1,
      resultsPerPage: 2,
      totalPages: 10,
      totalResults: 20,
      totalAvailableItems: 20,
    });
    expect(result.status.code).toBe(200);
  });

  it("returns no comments if reference is APP-NULL", async () => {
    const result = await specialistComments("public-council-1", "APP-NULL", {
      page: 1,
      resultsPerPage: 2,
      type: "specialist",
    });
    expect(result.data?.comments).toHaveLength(0);
    expect(result.data?.summary.totalComments).toBe(0);
    expect(result.data?.summary.totalConsulted).toBe(0);
    expect(result.pagination).toEqual({
      currentPage: 1,
      resultsPerPage: 2,
      totalPages: 0,
      totalResults: 0,
      totalAvailableItems: 0,
    });
  });

  it("returns a single comment matching the query", async () => {
    const result = await specialistComments("public-council-1", "APP-123", {
      page: 1,
      resultsPerPage: 2,
      type: "specialist",
      query: "hello",
    });
    expect(result.data?.comments).toHaveLength(1);
    expect(result.data!.comments![0].comment).toBe("hello");
    expect(result.data?.summary.totalComments).toBe(20);
    expect(result.data?.summary.totalConsulted).toBe(15);
    expect(result.pagination).toEqual({
      currentPage: 1,
      resultsPerPage: 2,
      totalPages: 1,
      totalResults: 1,
      totalAvailableItems: 20,
    });
  });

  it("returns no comments if query is 'noresultsplease'", async () => {
    const result = await specialistComments("public-council-1", "APP-123", {
      page: 1,
      resultsPerPage: 2,
      type: "specialist",
      query: "noresultsplease",
    });
    expect(result.data?.comments).toHaveLength(0);
    expect(result.pagination).toEqual({
      currentPage: 1,
      resultsPerPage: 2,
      totalPages: 0,
      totalResults: 0,
      totalAvailableItems: 20,
    });
  });
});
