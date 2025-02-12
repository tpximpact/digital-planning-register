import {
  getApplicationStatusSummary,
  getApplicationStatusSummarySentiment,
} from "@/lib/planningApplication";
import { DprPlanningApplication } from "@/types";
import { formatDateToYmd } from "@/util";

describe("getApplicationStatusSummary", () => {
  describe("Assessment-related statuses", () => {
    const assessmentStatuses: DprPlanningApplication["application"]["status"][] =
      [
        "assessment_in_progress",
        "in_assessment",
        "to_be_reviewed",
        "awaiting_determination",
        "in_committee",
      ];

    it('should return "Consultation in progress" if today is between consultation start and end dates', () => {
      const today = new Date();
      const startDate = formatDateToYmd(new Date(today.getTime() - 86400000));
      const endDate = formatDateToYmd(new Date(today.getTime() + 86400000));
      assessmentStatuses.forEach((status) => {
        expect(getApplicationStatusSummary(status, startDate, endDate)).toBe(
          "Consultation in progress",
        );
      });
    });

    it('should return "Assessment in progress" if consultation period is in the past', () => {
      const today = new Date();
      const startDate = formatDateToYmd(
        new Date(today.getTime() - 5 * 86400000),
      );
      const endDate = formatDateToYmd(new Date(today.getTime() - 86400000));
      assessmentStatuses.forEach((status) => {
        expect(getApplicationStatusSummary(status, startDate, endDate)).toBe(
          "Assessment in progress",
        );
      });
    });

    it('should return "Assessment in progress" status when consultation dates are not provided', () => {
      expect(getApplicationStatusSummary("assessment_in_progress")).toBe(
        "Assessment in progress",
      );
      expect(getApplicationStatusSummary("in_assessment")).toBe(
        "Assessment in progress",
      );
      expect(getApplicationStatusSummary("to_be_reviewed")).toBe(
        "Assessment in progress",
      );
      expect(getApplicationStatusSummary("awaiting_determination")).toBe(
        "Assessment in progress",
      );
      expect(getApplicationStatusSummary("in_committee")).toBe(
        "Assessment in progress",
      );
    });
  });

  describe("Final decision statuses", () => {
    it('should return "Closed" for status "closed"', () => {
      expect(getApplicationStatusSummary("closed")).toBe("Closed");
    });

    it('should return "Determined" for status "determined"', () => {
      expect(getApplicationStatusSummary("determined")).toBe("Determined");
    });

    it('should return "Returned" for status "returned"', () => {
      expect(getApplicationStatusSummary("returned")).toBe("Returned");
    });

    it('should return "Application withdrawn" for status "withdrawn"', () => {
      expect(getApplicationStatusSummary("withdrawn")).toBe(
        "Application withdrawn",
      );
    });
  });

  describe("Appeal statuses returned as is", () => {
    const appealStatusesAsIs: DprPlanningApplication["application"]["status"][] =
      ["Appeal lodged", "Appeal valid", "Appeal started", "Appeal determined"];
    appealStatusesAsIs.forEach((status) => {
      it(`should return "${status}" for status "${status}"`, () => {
        expect(getApplicationStatusSummary(status)).toBe(status);
      });
    });
  });

  describe("Appeal statuses mapped to 'Appeal determined'", () => {
    const appealStatusesDetermined: DprPlanningApplication["application"]["status"][] =
      [
        "Appeal allowed",
        "Appeal dismissed",
        "Appeal split decision",
        "Appeal withdrawn",
      ];
    appealStatusesDetermined.forEach((status) => {
      it(`should return "Appeal determined" for status "${status}"`, () => {
        expect(getApplicationStatusSummary(status)).toBe("Appeal determined");
      });
    });
  });

  describe("Fall-through statuses", () => {
    it("should format unknown statuses by replacing underscores and capitalizing", () => {
      expect(
        getApplicationStatusSummary(
          "pending" as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("Pending");
      expect(
        getApplicationStatusSummary(
          "not_started" as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("Not started");
      expect(
        getApplicationStatusSummary(
          "invalid" as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("Invalid");
    });
  });

  describe("Invalid or null statuses", () => {
    it("should return an empty string for null or undefined statuses", () => {
      expect(
        getApplicationStatusSummary(
          null as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("");
      expect(
        getApplicationStatusSummary(
          undefined as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("");
    });

    it("should return the correct final decision status if consultation dates are invalid", () => {
      expect(
        getApplicationStatusSummary(
          "determined",
          "invalid-date",
          "invalid-date",
        ),
      ).toBe("Determined");
    });
  });
});

describe("getApplicationStatusSummarySentiment", () => {
  it('should return "positive" for "Determined"', () => {
    expect(getApplicationStatusSummarySentiment("Determined")).toBe("positive");
  });

  it('should return "neutral" for "Consultation in progress"', () => {
    expect(
      getApplicationStatusSummarySentiment("Consultation in progress"),
    ).toBe("neutral");
  });

  it('should return "neutral" for "Assessment in progress"', () => {
    expect(getApplicationStatusSummarySentiment("Assessment in progress")).toBe(
      "neutral",
    );
  });

  it('should return "negative" for "Withdrawn"', () => {
    expect(getApplicationStatusSummarySentiment("Withdrawn")).toBe("negative");
  });

  it("should return undefined for an unknown status", () => {
    expect(
      getApplicationStatusSummarySentiment("Unknown status"),
    ).toBeUndefined();
  });

  it("should return undefined for null or undefined status", () => {
    expect(getApplicationStatusSummarySentiment(null as any)).toBeUndefined();
    expect(
      getApplicationStatusSummarySentiment(undefined as any),
    ).toBeUndefined();
  });
});
