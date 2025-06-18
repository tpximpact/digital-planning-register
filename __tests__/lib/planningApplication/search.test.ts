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

import { AppConfig } from "@/config/types";
import {
  validApplicationStatusSummaries,
  validApplicationTypes,
  validDprDecisionSummaries,
  validPublicApplicationStatusSummaries,
} from "@/lib/planningApplication";
import {
  APPLICATION_DATERANGE_OPTIONS,
  APPLICATION_DATETYPE_OPTIONS,
  APPLICATION_DPR_FILTER_OPTIONS,
  APPLICATION_ORDERBY_OPTIONS,
  APPLICATION_SORTBY_OPTIONS,
  checkSearchPerformed,
  validateSearchParams,
} from "@/lib/planningApplication/search";
import { SearchParamsApplication } from "@/types";

describe("checkSearchPerformed", () => {
  it("returns false if only page, resultsPerPage, or type are set", () => {
    expect(
      checkSearchPerformed({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      }),
    ).toBe(false);

    expect(
      checkSearchPerformed({
        page: 2,
        resultsPerPage: 25,
        type: "full",
      }),
    ).toBe(false);
  });

  it("returns true if any other param is set with a non-empty value", () => {
    expect(
      checkSearchPerformed({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        query: "test",
      }),
    ).toBe(true);

    expect(
      checkSearchPerformed({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        reference: "ABC123",
      }),
    ).toBe(true);

    expect(
      checkSearchPerformed({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        orderBy: "desc",
      }),
    ).toBe(true);

    expect(
      checkSearchPerformed({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dprFilter: "inConsultation",
      }),
    ).toBe(true);
  });

  it("returns false if extra params are set but empty/undefined/null", () => {
    expect(
      checkSearchPerformed({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        query: "",
        reference: undefined,
        orderBy: null as unknown as SearchParamsApplication["orderBy"],
      }),
    ).toBe(false);
  });

  it("returns false for an empty object", () => {
    expect(checkSearchPerformed({} as unknown as SearchParamsApplication)).toBe(
      false,
    );
  });
});

describe("validateSearchParams", () => {
  const mockAppConfig: AppConfig = {
    defaults: {
      resultsPerPage: 10,
    },
  } as unknown as AppConfig;

  describe("required fields: page, resultsPerPage, type", () => {
    it("returns default values when searchParams is undefined", () => {
      const result = validateSearchParams(mockAppConfig, undefined);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
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
        type: "simple",
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
        type: "simple",
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
        type: "simple",
      });
    });
  });

  // sortby, orderBy
  describe("sortBy, orderBy", () => {
    describe("parses valid sortBy and orderBy values", () => {
      it.each(
        APPLICATION_SORTBY_OPTIONS.flatMap((sortBy) =>
          APPLICATION_ORDERBY_OPTIONS.map((orderBy) => [sortBy, orderBy]),
        ),
      )("parses valid sortBy=%s and orderBy=%s values", (sortBy, orderBy) => {
        const searchParams = { sortBy, orderBy };
        const result = validateSearchParams(mockAppConfig, searchParams);

        expect(result).toEqual({
          page: 1,
          resultsPerPage: 10,
          type: "simple",
          sortBy,
          orderBy,
        });
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
        type: "simple",
      });
    });
  });

  // query
  describe("query", () => {
    it("parses valid query value", () => {
      const searchParams = {
        query: "test-query",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
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
        type: "simple",
        query: "test-query",
      });
    });
  });

  // type
  describe("type", () => {
    describe("parses valid types from searchParams", () => {
      it.each(["simple", "full"])(
        "parses valid type '%s' from searchParams",
        (type) => {
          const searchParams = { type };

          const result = validateSearchParams(mockAppConfig, searchParams);

          expect(result).toEqual({
            page: 1,
            resultsPerPage: 10,
            type,
          });
        },
      );
    });

    it("defaults to 'simple' type when type is invalid", () => {
      const searchParams = {
        type: "invalid",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });
  });

  // dprFilter
  describe("dprFilter", () => {
    describe("parses valid dprFilter's from searchParams", () => {
      it.each(APPLICATION_DPR_FILTER_OPTIONS)(
        "parses valid type '%s' from searchParams",
        (dprFilter) => {
          const searchParams = { dprFilter };

          const result = validateSearchParams(mockAppConfig, searchParams);

          expect(result).toEqual({
            page: 1,
            resultsPerPage: 10,
            type: "simple",
            dprFilter,
          });
        },
      );
    });

    it("ignores invalid dprFilter values", () => {
      const searchParams = {
        dprFilter: "invalid",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });
  });

  // reference
  describe("reference", () => {
    it("parses valid reference value", () => {
      const searchParams = {
        reference: "test-reference",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        reference: "test-reference",
      });
    });

    it("handles reference as an array and uses the first value", () => {
      const searchParams = {
        reference: ["test-reference", "another-reference"],
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        reference: "test-reference",
      });
    });
  });

  // description
  describe("description", () => {
    it("parses valid description value", () => {
      const searchParams = {
        description: "test-description",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        description: "test-description",
      });
    });

    it("handles description as an array and uses the first value", () => {
      const searchParams = {
        description: ["test-description", "another-description"],
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        description: "test-description",
      });
    });
  });

  // applicationType
  describe("applicationType", () => {
    const flatApplicationTypes = Object.values(validApplicationTypes).flat();

    it("allows all valid applicationType values", () => {
      const searchParams = {
        applicationType: flatApplicationTypes.join(","),
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        applicationType: flatApplicationTypes.join(","),
      });
    });

    it("ignores an invalid applicationType for multiple values", () => {
      const searchParams = {
        applicationType: [...flatApplicationTypes, "invalid"].join(","),
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        applicationType: flatApplicationTypes.join(","),
      });
    });

    describe("parses valid applicationType's from searchParams", () => {
      it.each(flatApplicationTypes)(
        "parses valid type '%s' from searchParams",
        (applicationType) => {
          const searchParams = { applicationType };

          const result = validateSearchParams(mockAppConfig, searchParams);

          expect(result).toEqual({
            page: 1,
            resultsPerPage: 10,
            type: "simple",
            applicationType,
          });
        },
      );
    });

    it("ignores invalid applicationType values", () => {
      const searchParams = {
        applicationType: "invalid",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });
  });

  // applicationStatus
  describe("applicationStatus", () => {
    it("allows all valid public application status summary values", () => {
      const searchParams = {
        applicationStatus: validPublicApplicationStatusSummaries.join(","),
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        applicationStatus: validPublicApplicationStatusSummaries.join(","),
      });
    });

    it("ignores an invalid application status summaries for multiple values", () => {
      const searchParams = {
        applicationStatus: [
          ...validPublicApplicationStatusSummaries,
          ...validApplicationStatusSummaries,
          "invalid",
        ].join(","),
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        applicationStatus: validPublicApplicationStatusSummaries.join(","),
      });
    });

    describe("parses valid application status summaries from searchParams", () => {
      it.each(validPublicApplicationStatusSummaries)(
        "parses valid applicationStatusSummary '%s' from searchParams",
        (applicationStatusSummary) => {
          const searchParams = { applicationStatus: applicationStatusSummary };

          const result = validateSearchParams(mockAppConfig, searchParams);

          expect(result).toEqual({
            page: 1,
            resultsPerPage: 10,
            type: "simple",
            applicationStatus: applicationStatusSummary,
          });
        },
      );
    });

    it("ignores invalid application status summary values", () => {
      const searchParams = {
        applicationStatus: "invalid",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });
  });

  // councilDecision
  describe("councilDecision", () => {
    it("allows all valid councilDecision values", () => {
      const searchParams = {
        councilDecision: validDprDecisionSummaries.join(","),
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        councilDecision: validDprDecisionSummaries.join(","),
      });
    });

    it("ignores an invalid councilDecision for multiple values", () => {
      const searchParams = {
        councilDecision: [...validDprDecisionSummaries, "invalid"].join(","),
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        councilDecision: validDprDecisionSummaries.join(","),
      });
    });

    describe("parses valid councilDecision from searchParams", () => {
      it.each(validDprDecisionSummaries)(
        "parses valid councilDecision '%s' from searchParams",
        (councilDecision) => {
          const searchParams = { councilDecision };

          const result = validateSearchParams(mockAppConfig, searchParams);

          expect(result).toEqual({
            page: 1,
            resultsPerPage: 10,
            type: "simple",
            councilDecision,
          });
        },
      );
    });

    it("ignores invalid councilDecision values", () => {
      const searchParams = {
        applicationStatus: "invalid",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });
  });

  // dateType
  describe("dateType", () => {
    describe("parses valid dateType's from searchParams", () => {
      it.each(APPLICATION_DATETYPE_OPTIONS)(
        "parses valid dateType '%s' from searchParams",
        (dateType) => {
          const searchParams = { dateType: dateType.value, dateRange: "week" };

          const result = validateSearchParams(mockAppConfig, searchParams);

          expect(result).toEqual({
            page: 1,
            resultsPerPage: 10,
            type: "simple",
            dateType: dateType.value,
            dateRange: "week",
          });
        },
      );
    });

    it("ignores invalid dateType values", () => {
      const searchParams = {
        dateType: "invalid",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });
  });

  // dateRange
  describe("dateRange", () => {
    describe("parses valid dateRange's from searchParams", () => {
      it.each(APPLICATION_DATERANGE_OPTIONS)(
        "parses valid dateRange '%s' from searchParams",
        (dateRange) => {
          const searchParams = {
            dateType: "receivedAt",
            dateRange: dateRange.value,
          };

          const result = validateSearchParams(mockAppConfig, searchParams);

          expect(result).toEqual({
            page: 1,
            resultsPerPage: 10,
            type: "simple",
            dateType: "receivedAt",
            dateRange: dateRange.value,
          });
        },
      );
    });

    it("ignores invalid dateRange values", () => {
      const searchParams = {
        dateRange: "invalid",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });
  });

  // dateRangeFrom, dateRangeTo
  describe("dateRangeFrom, dateRangeTo", () => {
    it("returns valid dateRangeFrom and dateRangeTo when both are valid and in the correct order", () => {
      const searchParams = {
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "2025-05-01",
        dateRangeTo: "2025-05-31",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "2025-05-01",
        dateRangeTo: "2025-05-31",
      });
    });

    it("returns undefined for both dateRangeFrom and dateRangeTo when they are out of order", () => {
      const searchParams = {
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "2025-05-31",
        dateRangeTo: "2025-05-01",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: undefined,
        dateRangeTo: undefined,
      });
    });

    it("sets dateRangeTo to the same value as dateRangeFrom when only dateRangeFrom is valid", () => {
      const searchParams = {
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "2025-05-01",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "2025-05-01",
        dateRangeTo: "2025-05-01",
      });
    });

    it("sets dateRangeFrom to the same value as dateRangeTo when only dateRangeTo is valid", () => {
      const searchParams = {
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeTo: "2025-05-31",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "2025-05-31",
        dateRangeTo: "2025-05-31",
      });
    });

    it("returns undefined for both dateRangeFrom and dateRangeTo when neither is valid", () => {
      const searchParams = {
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "invalid-date",
        dateRangeTo: "another-invalid-date",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: undefined,
        dateRangeTo: undefined,
      });
    });

    it("returns undefined for both dateRangeFrom and dateRangeTo when both are missing", () => {
      const searchParams = {};

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dateRangeFrom: undefined,
        dateRangeTo: undefined,
      });
    });
  });

  // dateType, dateRange, dateRangeFrom, dateRangeTo
  describe("dateType, dateRange, dateRangeFrom, dateRangeTo", () => {
    it("ignores all if dateType is missing", () => {
      const searchParams = {
        dateRange: "week",
        dateRangeFrom: "2023-01-01",
        dateRangeTo: "2023-01-07",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });

    it("ignores all if dateRange is missing", () => {
      const searchParams = {
        dateType: "receivedAt",
        dateRangeFrom: "2023-01-01",
        dateRangeTo: "2023-01-07",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
      });
    });

    it("ignores dateRangeFrom, dateRangeTo if dateRange is not set to fixed", () => {
      const searchParams = {
        dateType: "receivedAt",
        dateRange: "week",
        dateRangeFrom: "2023-01-01",
        dateRangeTo: "2023-01-07",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dateType: "receivedAt",
        dateRange: "week",
      });
    });

    it("allows dateRangeFrom, dateRangeTo if dateRange is set to fixed", () => {
      const searchParams = {
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "2023-01-01",
        dateRangeTo: "2023-01-07",
      };

      const result = validateSearchParams(mockAppConfig, searchParams);

      expect(result).toEqual({
        page: 1,
        resultsPerPage: 10,
        type: "simple",
        dateType: "receivedAt",
        dateRange: "fixed",
        dateRangeFrom: "2023-01-01",
        dateRangeTo: "2023-01-07",
      });
    });
  });
});
