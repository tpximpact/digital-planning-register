import { formatTag } from "@/util";

describe("formatTag", () => {
  it("should format tags with a dot", () => {
    const tag = "testPlan.suggested";
    const formattedTag = formatTag(tag);
    expect(formattedTag).toBe("Suggested Test Plan");
  });

  it("should format tags without a dot", () => {
    const tag = "testAndWorkForm";
    const formattedTag = formatTag(tag);
    expect(formattedTag).toBe("Test And Work Form");
  });

  it("should format tags with uppercase letters", () => {
    const tag = "testPlanSuggested";
    const formattedTag = formatTag(tag);
    expect(formattedTag).toBe("Test Plan Suggested");
  });

  it("should handle empty tags", () => {
    const tag = "";
    const formattedTag = formatTag(tag);
    expect(formattedTag).toBe("");
  });
});
