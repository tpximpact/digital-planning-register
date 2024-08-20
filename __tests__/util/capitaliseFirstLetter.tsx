// capitalizeFirstLetter.test.ts

import { capitalizeFirstLetter } from "@/util";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a lowercase string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("should capitalize the first letter of an uppercase string", () => {
    expect(capitalizeFirstLetter("world")).toBe("World");
  });

  it("should handle an empty string", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("should handle a string with the first character already capitalized", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
  });

  it("should handle a string with mixed case", () => {
    expect(capitalizeFirstLetter("hELLO")).toBe("Hello");
  });
});
