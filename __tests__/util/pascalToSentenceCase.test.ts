import { pascalToSentenceCase } from "@/util/pascalToSentenceCase";

describe("pascalToSentenceCase", () => {
  it("converts PascalCase to sentence case", () => {
    expect(pascalToSentenceCase("PascalCaseString")).toBe("pascal case string");
    expect(pascalToSentenceCase("AnotherExampleHere")).toBe(
      "another example here",
    );
    expect(pascalToSentenceCase("SingleWord")).toBe("single word");
    expect(pascalToSentenceCase("Test")).toBe("test");
  });

  it("handles strings with no uppercase letters", () => {
    expect(pascalToSentenceCase("lowercase")).toBe("lowercase");
  });

  it("handles strings with consecutive uppercase letters", () => {
    expect(pascalToSentenceCase("XMLParser")).toBe("xml parser");
    expect(pascalToSentenceCase("HTTPRequest")).toBe("http request");
  });

  it("handles empty strings", () => {
    expect(pascalToSentenceCase("")).toBe("");
  });

  it("handles strings with only one word", () => {
    expect(pascalToSentenceCase("Word")).toBe("word");
  });

  it("handles punctuation", () => {
    expect(pascalToSentenceCase("Word.")).toBe("word.");
    expect(pascalToSentenceCase("Hello.World!")).toBe("hello world!");
  });
});
