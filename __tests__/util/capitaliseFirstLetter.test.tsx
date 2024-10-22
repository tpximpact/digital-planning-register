// capitalizeFirstLetter.test.ts

import { capitalizeFirstLetter } from "@/util";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a single word", () => {
    const result = capitalizeFirstLetter("hello");
    expect(result).toBe("Hello");
  });

  it("should capitalize the first letter of a sentence", () => {
    const result = capitalizeFirstLetter("hello world");
    expect(result).toBe("Hello world");
  });

  it("should handle an empty string", () => {
    const result = capitalizeFirstLetter("");
    expect(result).toBe("");
  });

  it("should handle a string with mixed case", () => {
    const result = capitalizeFirstLetter("hElLo WoRLd");
    expect(result).toBe("Hello world");
  });

  it("should handle a string with numbers", () => {
    const result = capitalizeFirstLetter("123abc");
    expect(result).toBe("123abc");
  });

  it("should handle a string with special characters", () => {
    const result = capitalizeFirstLetter("!hello");
    expect(result).toBe("!hello");
  });

  it("should handle a string with leading and trailing spaces", () => {
    const result = capitalizeFirstLetter("  hello world  ");
    expect(result).toBe("  hello world  ");
  });
});
