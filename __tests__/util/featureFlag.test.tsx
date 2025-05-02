import { getEnabledFields } from "../../src/util/featureFlag";

describe("getEnabledFields", () => {
  it("returns all fields when disabledFields is empty", () => {
    const allFields = [
      "sentiment",
      "query",
      "resultsPerPage",
      "publishedAtFrom",
      "publishedAtTo",
    ];
    const disabledFields: string[] = [];
    expect(getEnabledFields(allFields, disabledFields)).toEqual([
      "sentiment",
      "query",
      "resultsPerPage",
      "publishedAtFrom",
      "publishedAtTo",
    ]);
  });

  it("filters out disabled fields", () => {
    const allFields = [
      "sentiment",
      "query",
      "resultsPerPage",
      "publishedAtFrom",
      "publishedAtTo",
    ];
    const disabledFields = [
      "resultsPerPage",
      "publishedAtFrom",
      "publishedAtTo",
    ];
    expect(getEnabledFields(allFields, disabledFields)).toEqual([
      "sentiment",
      "query",
    ]);
  });

  it("returns empty array when all fields are disabled", () => {
    const allFields = [
      "sentiment",
      "query",
      "resultsPerPage",
      "publishedAtFrom",
      "publishedAtTo",
    ];
    const disabledFields = [
      "sentiment",
      "query",
      "resultsPerPage",
      "publishedAtFrom",
      "publishedAtTo",
    ];
    expect(getEnabledFields(allFields, disabledFields)).toEqual([]);
  });
});
