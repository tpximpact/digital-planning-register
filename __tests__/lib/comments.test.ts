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
import { checkCommentsEnabled } from "@/lib/comments";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { getCommentTypeToShow } from "@/lib/comments";
import { AppConfig } from "@/config/types";
import { validateSearchParams } from "@/lib/comments";

const { assessmentInProgress, consultation, planningOfficerDetermined } =
  generateExampleApplications();

describe("checkCommentsEnabled", () => {
  it("Application not in consultation should now allow comments", () => {
    const application = assessmentInProgress;
    application.data.localPlanningAuthority.commentsAcceptedUntilDecision =
      false;

    const commentsEnabled = checkCommentsEnabled(application);
    expect(commentsEnabled).toBe(false);
  });

  it("Application in consultation should allow comments", () => {
    const application = consultation;

    const commentsEnabled = checkCommentsEnabled(application);
    expect(commentsEnabled).toBe(true);
  });

  it("Application not in consultation and not yet determined but which the LPA allows comments until determination should allow comments", () => {
    const application = assessmentInProgress;
    application.data.localPlanningAuthority.commentsAcceptedUntilDecision =
      true;

    const commentsEnabled = checkCommentsEnabled(application);
    expect(commentsEnabled).toBe(true);
  });

  it("Application determined but which the LPA allows comments until determination should not allow comments", () => {
    const application = planningOfficerDetermined;
    application.data.localPlanningAuthority.commentsAcceptedUntilDecision =
      true;

    const commentsEnabled = checkCommentsEnabled(application);
    expect(commentsEnabled).toBe(false);
  });
});

describe("getCommentTypeToShow", () => {
  const mockCouncilConfig = {
    publicComments: true,
    specialistComments: true,
  } as unknown as AppConfig["council"];

  it("returns 'public' when searchParams.type is 'public'", () => {
    const searchParams = { type: "public" };
    const result = getCommentTypeToShow(mockCouncilConfig, searchParams);
    expect(result).toBe("public");
  });

  it("returns 'specialist' when searchParams.type is 'specialist'", () => {
    const searchParams = { type: "specialist" };
    const result = getCommentTypeToShow(mockCouncilConfig, searchParams);
    expect(result).toBe("specialist");
  });

  it("defaults to 'public' when searchParams.type is missing and publicComments is enabled", () => {
    const searchParams = {};
    const result = getCommentTypeToShow(mockCouncilConfig, searchParams);
    expect(result).toBe("public");
  });

  it("defaults to 'specialist' when searchParams.type is missing and publicComments is disabled", () => {
    const councilConfig = {
      ...mockCouncilConfig,
      publicComments: false,
    } as unknown as AppConfig["council"];
    const searchParams = {};
    const result = getCommentTypeToShow(councilConfig, searchParams);
    expect(result).toBe("specialist");
  });

  it("returns 'public' when searchParams.type is an array with 'public'", () => {
    const searchParams = { type: ["public", "specialist"] };
    const result = getCommentTypeToShow(mockCouncilConfig, searchParams);
    expect(result).toBe("public");
  });

  it("returns 'specialist' when searchParams.type is an array with 'specialist'", () => {
    const searchParams = { type: ["specialist", "public"] };
    const result = getCommentTypeToShow(mockCouncilConfig, searchParams);
    expect(result).toBe("specialist");
  });

  it("defaults to 'public' when searchParams.type is invalid and publicComments is enabled", () => {
    const searchParams = { type: "invalid" };
    const result = getCommentTypeToShow(mockCouncilConfig, searchParams);
    expect(result).toBe("public");
  });

  it("defaults to 'specialist' when searchParams.type is invalid and publicComments is disabled", () => {
    const councilConfig = {
      ...mockCouncilConfig,
      publicComments: false,
    } as unknown as AppConfig["council"];
    const searchParams = { type: "invalid" };
    const result = getCommentTypeToShow(councilConfig, searchParams);
    expect(result).toBe("specialist");
  });

  it("defaults to 'specialist' when both publicComments and specialistComments are disabled", () => {
    const councilConfig = {
      publicComments: false,
      specialistComments: false,
    } as unknown as AppConfig["council"];
    const searchParams = {};
    const result = getCommentTypeToShow(councilConfig, searchParams);
    expect(result).toBe("specialist");
  });
});

describe("validateSearchParams", () => {
  const mockAppConfig: AppConfig = {
    council: {
      publicComments: true,
      specialistComments: true,
    },
    defaults: {
      resultsPerPage: 10,
    },
  } as unknown as AppConfig;

  it("returns default values when searchParams is undefined", () => {
    const result = validateSearchParams(mockAppConfig, undefined);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10,
      type: "public",
    });
  });

  it("parses valid page and resultsPerPage values", () => {
    const searchParams = {
      page: "2",
      resultsPerPage: "25",
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 2,
      resultsPerPage: 25,
      type: "public",
    });
  });

  it("defaults to page 1 and resultsPerPage from appConfig when invalid values are provided", () => {
    const searchParams = {
      page: "invalid",
      resultsPerPage: "invalid",
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10,
      type: "public",
    });
  });

  it("validates resultsPerPage against COMMENT_RESULTSPERPAGE_OPTIONS", () => {
    const searchParams = {
      resultsPerPage: "100", // Invalid value
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10, // Defaults to appConfig value
      type: "public",
    });
  });

  it("parses valid sortBy and orderBy values", () => {
    const searchParams = {
      sortBy: "receivedAt",
      orderBy: "asc",
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10,
      type: "public",
      sortBy: "receivedAt",
      orderBy: "asc",
    });
  });

  it("ignores invalid sortBy and orderBy values", () => {
    const searchParams = {
      sortBy: "invalid",
      orderBy: "invalid",
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10,
      type: "public",
    });
  });

  it("parses valid query value", () => {
    const searchParams = {
      query: "test-query",
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10,
      type: "public",
      query: "test-query",
    });
  });

  it("handles query as an array and uses the first value", () => {
    const searchParams = {
      query: ["test-query", "another-query"],
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10,
      type: "public",
      query: "test-query",
    });
  });

  it("parses type from searchParams", () => {
    const searchParams = {
      type: "specialist",
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10,
      type: "specialist",
    });
  });

  it("defaults to 'public' type when type is invalid", () => {
    const searchParams = {
      type: "invalid",
    };

    const result = validateSearchParams(mockAppConfig, searchParams);

    expect(result).toEqual({
      page: 1,
      resultsPerPage: 10,
      type: "public",
    });
  });
});
