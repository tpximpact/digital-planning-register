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

import {
  makeCommentSummary,
  specialistComments,
} from "@/handlers/local/v1/specialistComments";
import { getAppConfig } from "@/config";
import {
  generateNResults,
  generateComment,
  generatePagination,
} from "../../../../__mocks__/dprApplicationFactory";
import { SpecialistRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import { totalmem } from "os";

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

describe("makeCommentSummary", () => {
  it("returns the correct numbers", () => {
    const obj: SpecialistRedacted[] = [
      {
        id: "ab120ce0-6d4e-4291-ba0b-9c9df1464e96",
        organisationSpecialism: "Abernathy - Yundt",
        jobTitle: "International Intranet Liaison",
        reason: "Constraint",
        firstConsultedAt: "2025-09-09T09:51:41.194Z",
        comments: [
          {
            id: "e25735ce-e55e-4217-a930-21c15d540778",
            sentiment: "approved",
            commentRedacted:
              "Only this sentiment should count towards the sentiment counts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam perferendis quia quia.",
            metadata: {
              submittedAt: "2000-01-01T00:00:00Z",
              validatedAt: "2000-01-01T00:00:00Z",
              publishedAt: "2000-01-02T00:00:00Z",
            },
          },
          {
            id: "e25735ce-e55e-4217-a930-21c15d540778",
            sentiment: "amendmentsNeeded",
            commentRedacted:
              "This counts towards the comments counts but not the sentiment counts since its been updated",
            metadata: {
              submittedAt: "2000-01-01T00:00:00Z",
              validatedAt: "2000-01-01T00:00:00Z",
              publishedAt: "2000-01-01T00:00:00Z",
            },
          },
        ],
        name: { singleLine: "Jessie Beahan" },
      },
      {
        id: "eaeb402e-a830-414d-97b2-376c782bcd5f",
        organisationSpecialism: "Larkin Inc",
        jobTitle: "Senior Data Coordinator",
        reason: "Other",
        firstConsultedAt: "2024-10-15T20:44:51.949Z",
        comments: [
          {
            id: "613f0d6d-42e4-4358-aee8-76873d863926",
            sentiment: "amendmentsNeeded",
            commentRedacted:
              "Circumvenio comitatus molestiae comprehendo aurum solum. Cena adfero acsi depraedor cimentarius creptio cilicium templum nemo. Tener minima tenax cena verbum.",
            metadata: {
              submittedAt: "2000-01-01T00:00:00Z",
              validatedAt: "2000-01-01T00:00:00Z",
              publishedAt: "2000-01-04T00:00:00Z",
            },
          },
          {
            id: "613f0d6d-42e4-4358-aee8-76873d863926",
            sentiment: "objected",
            commentRedacted:
              "Circumvenio comitatus molestiae comprehendo aurum solum. Cena adfero acsi depraedor cimentarius creptio cilicium templum nemo. Tener minima tenax cena verbum.",
            metadata: {
              submittedAt: "2000-01-01T00:00:00Z",
              validatedAt: "2000-01-01T00:00:00Z",
              publishedAt: "2000-01-02T00:00:00Z",
            },
          },
        ],
        name: { singleLine: "Lillie Collier" },
      },
    ];
    const summary = makeCommentSummary(obj);
    expect(summary).toEqual({
      totalConsulted: 2,
      totalComments: 4,
      sentiment: { approved: 1, objected: 0, amendmentsNeeded: 1 },
    });
  });
});

describe("specialistComments", () => {
  it("returns paginated comments and summary", async () => {
    const result = await specialistComments("public-council-1", "APP-123", {
      page: 1,
      resultsPerPage: 2,
      type: "specialist",
    });
    expect(result.data?.comments).toHaveLength(2);
    expect(result.data?.summary.totalComments).toBe(40); // 2 * 10 = 20 specialists w 2 comments each = 40
    expect(result.data?.summary.totalConsulted).toBe(20); // 2 * 10 - 5
    expect(result.pagination).toEqual({
      currentPage: 1,
      resultsPerPage: 2,
      totalPages: 1,
      totalResults: 2,
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
