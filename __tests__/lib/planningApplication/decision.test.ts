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
  getApplicationDecisionSummary,
  getApplicationDecisionSummarySentiment,
  getApplicationDprDecisionSummary,
} from "@/lib/planningApplication";
import { DprApplication, DprPlanningApplication } from "@/types";

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

describe("getApplicationDprDecisionSummary", () => {
  describe("getApplicationDprDecisionSummary with council decisions", () => {
    it('should return "Granted" if priorApprovalRequired is undefined and councilDecision is granted ', () => {
      const application = {
        data: {
          assessment: {
            councilDecision: "granted",
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Granted");
    });

    it('should return "Refused" if priorApprovalRequired is undefined and councilDecision is refused ', () => {
      const application = {
        data: {
          assessment: {
            councilDecision: "refused",
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Refused");
    });

    it('should return "Prior approval required and approved" if priorApprovalRequired is true and councilDecision is granted ', () => {
      const application = {
        data: {
          assessment: {
            councilDecision: "granted",
            priorApprovalRequired: true,
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Prior approval required and approved");
    });

    it('should return "Prior approval required and refused" if priorApprovalRequired is true and councilDecision is refused ', () => {
      const application = {
        data: {
          assessment: {
            councilDecision: "refused",
            priorApprovalRequired: true,
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Prior approval required and refused");
    });

    it('should return "Prior approval not required" if priorApprovalRequired is false and councilDecision is granted ', () => {
      const application = {
        data: {
          assessment: {
            councilDecision: "granted",
            priorApprovalRequired: false,
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Prior approval not required");
    });

    it('should return "Prior approval not required" if priorApprovalRequired is false and councilDecision is refused ', () => {
      const application = {
        data: {
          assessment: {
            councilDecision: "refused",
            priorApprovalRequired: false,
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Prior approval not required");
    });

    it("should return undefined if no councilDecision is set", () => {
      const application = {
        data: {},
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBeUndefined();
    });
  });
  describe("getApplicationDprDecisionSummary with committee decisions", () => {
    it('should return "Granted" if priorApprovalRequired is undefined and committeeDecision is granted ', () => {
      const application = {
        data: {
          assessment: {
            committeeDecision: "granted",
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Granted");
    });

    it('should return "Refused" if priorApprovalRequired is undefined and committeeDecision is refused ', () => {
      const application = {
        data: {
          assessment: {
            committeeDecision: "refused",
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Refused");
    });

    it('should return "Prior approval required and approved" if priorApprovalRequired is true and committeeDecision is granted ', () => {
      const application = {
        data: {
          assessment: {
            committeeDecision: "granted",
            priorApprovalRequired: true,
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Prior approval required and approved");
    });

    it('should return "Prior approval required and refused" if priorApprovalRequired is true and committeeDecision is refused ', () => {
      const application = {
        data: {
          assessment: {
            committeeDecision: "refused",
            priorApprovalRequired: true,
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Prior approval required and refused");
    });

    it('should return "Prior approval not required" if priorApprovalRequired is false and committeeDecision is granted ', () => {
      const application = {
        data: {
          assessment: {
            committeeDecision: "granted",
            priorApprovalRequired: false,
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Prior approval not required");
    });

    it('should return "Prior approval not required" if priorApprovalRequired is false and committeeDecision is refused ', () => {
      const application = {
        data: {
          assessment: {
            committeeDecision: "refused",
            priorApprovalRequired: false,
          },
        },
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBe("Prior approval not required");
    });

    it("should return undefined if no committeeDecision is set", () => {
      const application = {
        data: {},
      };
      const result = getApplicationDprDecisionSummary(
        application as unknown as DprApplication,
      );
      expect(result).toBeUndefined();
    });
  });
});
