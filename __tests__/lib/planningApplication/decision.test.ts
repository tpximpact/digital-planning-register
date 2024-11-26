import {
  getApplicationDecisionSummary,
  getApplicationDecisionSummarySentiment,
} from "@/lib/planningApplication";
import { DprPlanningApplication } from "@/types";

describe("getApplicationDecisionSummary", () => {
  it('should return "Prior approval required and approved" for prior approval application type and "granted" decision', () => {
    const applicationType: DprPlanningApplication["applicationType"] =
      "pa.part1.classA";
    const decision = "granted";
    const result = getApplicationDecisionSummary(applicationType, decision);
    expect(result).toBe("Prior approval required and approved");
  });

  it('should return "Prior approval not required" for prior approval application type and "not_required" decision', () => {
    const applicationType: DprPlanningApplication["applicationType"] =
      "pa.part1.classA";
    const decision = "not_required";
    const result = getApplicationDecisionSummary(applicationType, decision);
    expect(result).toBe("Prior approval not required");
  });

  it('should return "Prior approval required and refused" for prior approval application type and "refused" decision', () => {
    const applicationType: DprPlanningApplication["applicationType"] =
      "pa.part1.classA";
    const decision = "refused";
    const result = getApplicationDecisionSummary(applicationType, decision);
    expect(result).toBe("Prior approval required and refused");
  });

  it("should capitalize the decision for non-prior approval application types", () => {
    const applicationType: DprPlanningApplication["applicationType"] =
      "pp.full";
    const decision = "granted";
    const result = getApplicationDecisionSummary(applicationType, decision);
    expect(result).toBe("Granted");
  });

  it("should return undefined if decision is not provided", () => {
    const applicationType: DprPlanningApplication["applicationType"] =
      "pp.full";
    const result = getApplicationDecisionSummary(applicationType);
    expect(result).toBeUndefined();
  });

  it("should return the capitalized decision if it is not in the prior approval map", () => {
    const applicationType: DprPlanningApplication["applicationType"] =
      "pa.part1.classA";
    const decision = "custom_decision";
    const result = getApplicationDecisionSummary(applicationType, decision);
    expect(result).toBe("Custom_decision");
  });
});

describe("getApplicationDecisionSummarySentiment", () => {
  it('should return "positive" for "Granted"', () => {
    const status = "Granted";
    const result = getApplicationDecisionSummarySentiment(status);
    expect(result).toBe("positive");
  });

  it('should return "positive" for "Prior approval required and approved"', () => {
    const status = "Prior approval required and approved";
    const result = getApplicationDecisionSummarySentiment(status);
    expect(result).toBe("positive");
  });

  it('should return "positive" for "Prior approval not required"', () => {
    const status = "Prior approval not required";
    const result = getApplicationDecisionSummarySentiment(status);
    expect(result).toBe("positive");
  });

  it('should return "negative" for "Prior approval required and refused"', () => {
    const status = "Prior approval required and refused";
    const result = getApplicationDecisionSummarySentiment(status);
    expect(result).toBe("negative");
  });

  it('should return "negative" for "Refused"', () => {
    const status = "Refused";
    const result = getApplicationDecisionSummarySentiment(status);
    expect(result).toBe("negative");
  });

  it("should return undefined for an unknown status", () => {
    const status = "Unknown status";
    const result = getApplicationDecisionSummarySentiment(status);
    expect(result).toBeUndefined();
  });
});
