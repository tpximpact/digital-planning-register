import { capitaliseWord } from "@/util";

describe("capitaliseWord", () => {
  it("should capitalise a single word", () => {
    const result = capitaliseWord("hello");
    expect(result).toBe("Hello");
  });

  it("should capitalise multiple words", () => {
    const result = capitaliseWord("hello world");
    expect(result).toBe("Hello World");
  });

  it("should return an empty string when input is empty", () => {
    const result = capitaliseWord("");
    expect(result).toBe("");
  });

  it("should capitalise words in a string with mixed case", () => {
    const result = capitaliseWord("hElLo WoRLd");
    expect(result).toBe("Hello World");
  });

  it("should handle strings with special characters", () => {
    const result = capitaliseWord("hello-world");
    expect(result).toBe("Hello-world");
  });

  it("should handle strings with multiple spaces", () => {
    const result = capitaliseWord("hello   world");
    expect(result).toBe("Hello   World");
  });

  it("should handle strings with leading and trailing spaces", () => {
    const result = capitaliseWord("  hello world  ");
    expect(result).toBe("  Hello World  ");
  });
});
