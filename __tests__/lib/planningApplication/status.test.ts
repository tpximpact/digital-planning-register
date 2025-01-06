import {
  getApplicationStatusSummary,
  getApplicationStatusSummarySentiment,
} from "@/lib/planningApplication";
import { DprPlanningApplication } from "@/types";
import { formatDateToYmd } from "@/util";

describe("getApplicationStatusSummary", () => {
  it("should return the capitalized status with spaces for underscores", () => {
    const status: DprPlanningApplication["application"]["status"] =
      "in_assessment";
    const result = getApplicationStatusSummary(status);
    expect(result).toBe("In assessment");
  });

  it('should return "Consultation in progress" if end date is today', () => {
    const status: DprPlanningApplication["application"]["status"] =
      "in_assessment";
    const today = new Date();
    const endDate = formatDateToYmd(today);
    const result = getApplicationStatusSummary(status, endDate);
    expect(result).toBe("Consultation in progress");
  });

  it('should return "Consultation in progress" if end date is in the future', () => {
    const status: DprPlanningApplication["application"]["status"] =
      "in_assessment";
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const endDate = formatDateToYmd(tomorrow);
    const result = getApplicationStatusSummary(status, endDate);
    expect(result).toBe("Consultation in progress");
  });

  it('should return "Assessment in progress" if end date is in the past', () => {
    const status: DprPlanningApplication["application"]["status"] =
      "in_assessment";
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const endDate = formatDateToYmd(yesterday);
    const result = getApplicationStatusSummary(status, endDate);
    expect(result).toBe("Assessment in progress");
  });

  it("should return the capitalized status with spaces for underscores if end date is not provided", () => {
    const status: DprPlanningApplication["application"]["status"] =
      "awaiting_determination";
    const result = getApplicationStatusSummary(status);
    expect(result).toBe("Awaiting determination");
  });

  it("should return the capitalized status with spaces for underscores if end date is invalid", () => {
    const status: DprPlanningApplication["application"]["status"] =
      "determined";
    const endDate = new Date().toISOString();
    const result = getApplicationStatusSummary(status, endDate);
    expect(result).toBe("Determined");
  });

  it("should return the capitalized status with spaces for underscores if status is not in relevantStatus", () => {
    const status: DprPlanningApplication["application"]["status"] =
      "determined";
    const endDate = new Date().toISOString();
    const result = getApplicationStatusSummary(status, endDate);
    expect(result).toBe("Determined");
  });
});

describe("getApplicationStatusSummarySentiment", () => {
  it('should return "positive" for "Determined"', () => {
    const status = "Determined";
    const result = getApplicationStatusSummarySentiment(status);
    expect(result).toBe("positive");
  });

  it('should return "neutral" for "Consultation in progress"', () => {
    const status = "Consultation in progress";
    const result = getApplicationStatusSummarySentiment(status);
    expect(result).toBe("neutral");
  });

  it('should return "neutral" for "Assessment in progress"', () => {
    const status = "Assessment in progress";
    const result = getApplicationStatusSummarySentiment(status);
    expect(result).toBe("neutral");
  });

  it('should return "negative" for "Withdrawn"', () => {
    const status = "Withdrawn";
    const result = getApplicationStatusSummarySentiment(status);
    expect(result).toBe("negative");
  });

  it("should return undefined for an unknown status", () => {
    const status = "Unknown status";
    const result = getApplicationStatusSummarySentiment(status);
    expect(result).toBeUndefined();
  });
});
