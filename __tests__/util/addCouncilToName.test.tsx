import { addCouncilToName } from "@/util";

describe("addCouncilToName", () => {
  it("should add 'Council' to the end of the name if it doesn't contain 'council'", () => {
    expect(addCouncilToName("Camden")).toBe("Camden Council");
    expect(addCouncilToName("Barnet")).toBe("Barnet Council");
  });

  it("should not add 'Council' if the name already contains 'council'", () => {
    expect(addCouncilToName("Camden Council")).toBe("Camden Council");
    expect(addCouncilToName("Barnet Borough Council")).toBe(
      "Barnet Borough Council",
    );
  });

  it("should be case insensitive when checking for 'council'", () => {
    expect(addCouncilToName("Camden council")).toBe("Camden council");
    expect(addCouncilToName("BARNET COUNCIL")).toBe("BARNET COUNCIL");
  });

  it("should handle empty strings", () => {
    expect(addCouncilToName("")).toBe("");
  });

  it("should handle strings with only whitespace", () => {
    expect(addCouncilToName(" ")).toBe(" ");
  });
});
