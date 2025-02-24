import { splitStringOnOrBeforeMaxChars } from "@/util/splitStringOnOrBeforeMaxChars";

describe("splitStringOnOrBeforeMaxChars", () => {
  it("should split text into summary and continued based on maxChars", () => {
    const text = "one. two, three. four.";
    const result = splitStringOnOrBeforeMaxChars(text, 22);
    expect(result.summary).toBe("one. two, three. four.");
    expect(result.continued).toBe("");
  });

  it("should split text into summary and continued based on maxChars", () => {
    const text = "one. two, three. four.";
    const result = splitStringOnOrBeforeMaxChars(text, 2);
    expect(result.summary).toBe("");
    expect(result.continued).toBe("one. two, three. four.");
  });

  it("should split text into summary and continued based on maxChars", () => {
    const text = "one. two, three. four";
    const result = splitStringOnOrBeforeMaxChars(text, 4);
    expect(result.summary).toBe("one.");
    expect(result.continued).toBe("two, three. four");
  });

  it("should split text into summary and continued based on maxChars", () => {
    const text = "one. two, three. four";
    const result = splitStringOnOrBeforeMaxChars(text, 6);
    expect(result.summary).toBe("one.");
    expect(result.continued).toBe("two, three. four");
  });

  it("should split text into summary and continued based on maxChars", () => {
    const text = "one. two, three. four";
    const result = splitStringOnOrBeforeMaxChars(text, 18);
    expect(result.summary).toBe("one. two, three.");
    expect(result.continued).toBe("four");
  });
});
