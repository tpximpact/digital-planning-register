import "@testing-library/jest-dom";
import { getValueFromUnknownSearchParams } from "@/lib/search";
import { UnknownSearchParams } from "@/types";

describe("getValueFromUnknownSearchParams", () => {
  it("returns the value when it is a string", () => {
    const searchParams = { key1: "value1" };
    const result = getValueFromUnknownSearchParams(searchParams, "key1");
    expect(result).toBe("value1");
  });

  it("returns the first value when it is an array", () => {
    const searchParams = { key1: ["value1", "value2"] };
    const result = getValueFromUnknownSearchParams(searchParams, "key1");
    expect(result).toBe("value1");
  });

  it("returns undefined when the key does not exist", () => {
    const searchParams = { key1: "value1" };
    const result = getValueFromUnknownSearchParams(searchParams, "key2");
    expect(result).toBeUndefined();
  });

  it("returns undefined when the value is undefined", () => {
    const searchParams = { key1: undefined };
    const result = getValueFromUnknownSearchParams(searchParams, "key1");
    expect(result).toBeUndefined();
  });

  it("handles an empty array gracefully", () => {
    const searchParams = { key1: [] };
    const result = getValueFromUnknownSearchParams(searchParams, "key1");
    expect(result).toBeUndefined();
  });

  it("handles null values gracefully", () => {
    const searchParams = { key1: null };
    const result = getValueFromUnknownSearchParams(
      searchParams as unknown as UnknownSearchParams,
      "key1",
    );
    expect(result).toBeNull();
  });
});
