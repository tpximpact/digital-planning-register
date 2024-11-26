import { getCommentsAllowed } from "@/lib/planningApplication/consultation";
import { DprPlanningApplication } from "@/types";

describe("getCommentsAllowed", () => {
  it('should return false for "ldc" application type', () => {
    const applicationType: DprPlanningApplication["applicationType"] = "ldc";
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(false);
  });

  it('should return true for non-"ldc" application types', () => {
    const applicationTypes: DprPlanningApplication["applicationType"][] = [
      "pp.full",
      "pa.part1.classA",
      "advertConsent",
      "amendment",
      "approval",
    ];

    applicationTypes.forEach((type) => {
      const result = getCommentsAllowed(type);
      expect(result).toBe(true);
    });
  });

  it("should return true for an unknown application type", () => {
    const applicationType: any = "unknownType.part1.classA";
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(true);
  });

  it("should return true for an empty application type", () => {
    const applicationType: any = "";
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(true);
  });

  it("should return true for a null application type", () => {
    const applicationType: any = null;
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(true);
  });

  it("should return true for an undefined application type", () => {
    const applicationType: any = undefined;
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(true);
  });
});
