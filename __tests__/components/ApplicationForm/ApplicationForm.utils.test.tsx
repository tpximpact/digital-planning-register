/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import {
  processApplicationForm,
  filterSensitiveData,
  mergeApplicationData,
  isPrimitive,
  isFlatArrayOfPrimitives,
  isObjectOfPrimitives,
} from "@/components/ApplicationForm";

describe("filterSensitiveData", () => {
  it("removes responses with 'disab' in the question", () => {
    const input = {
      responses: [
        { question: "What is your disability?", value: "test" },
        { question: "Other question", value: "ok" },
      ],
      foo: "bar",
    };
    type FilteredData = {
      responses: Array<{ question: string; value: string }>;
      foo: string;
    };
    const result = filterSensitiveData(input) as FilteredData;
    expect(result.responses).toHaveLength(1);
    expect(result.responses[0].question).toBe("Other question");
    expect(result.foo).toBe("bar");
  });

  it("removes responses with 'Pay and send' in the metadata section name", () => {
    const input = {
      responses: [
        {
          question: "What is your disability?",
          value: "test",
          metadata: {
            sectionName: "Pay and send",
          },
        },
        { question: "Other question", value: "ok" },
      ],
      foo: "bar",
    };
    type FilteredData = {
      responses: Array<{ question: string; value: string }>;
      foo: string;
    };
    const result = filterSensitiveData(input) as FilteredData;
    expect(result.responses).toHaveLength(1);
    expect(result.responses[0].question).toBe("Other question");
    expect(result.foo).toBe("bar");
  });

  it("returns undefined if input does not match expected shape", () => {
    expect(filterSensitiveData(null)).toBeUndefined();
    expect(filterSensitiveData({})).toBeUndefined();
    expect(filterSensitiveData({ responses: "not-an-array" })).toBeUndefined();
  });
});

describe("mergeApplicationData", () => {
  it("moves properties from data to top level", () => {
    const input = {
      data: { a: 1, b: 2 },
      c: 3,
    };

    const result = mergeApplicationData(input) as Record<string, unknown>;
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toBe(3);
    expect(result.data).toBeUndefined();
  });

  it("returns input if no data property", () => {
    const input = { foo: "bar" };
    expect(mergeApplicationData(input)).toEqual(input);
  });

  it("returns input if data is not an object", () => {
    const input = { data: null, foo: "bar" };
    expect(mergeApplicationData(input)).toEqual(input);
    const input2 = { data: 123, foo: "bar" };
    expect(mergeApplicationData(input2)).toEqual(input2);
  });
});

describe("processApplicationForm", () => {
  it("filters sensitive responses and merges data", () => {
    const input = {
      data: { a: 1 },
      responses: [
        { question: "disab", value: "should be removed" },
        { question: "other", value: "should stay" },
      ],
      foo: "bar",
    };

    type ProcessedData = {
      a: number;
      foo: string;
      responses: Array<{ question: string; value: string }>;
    };

    const result = processApplicationForm(input) as ProcessedData;
    expect(result.a).toBe(1);
    expect(result.foo).toBe("bar");
    expect(result.responses).toHaveLength(1);
    expect(result.responses[0].question).toBe("other");
  });
});

describe("isPrimitive", () => {
  it("returns true for strings", () => {
    expect(isPrimitive("hello")).toBe(true);
    expect(isPrimitive("")).toBe(true);
  });

  it("returns true for numbers", () => {
    expect(isPrimitive(42)).toBe(true);
    expect(isPrimitive(0)).toBe(true);
    expect(isPrimitive(-1)).toBe(true);
    expect(isPrimitive(NaN)).toBe(true);
    expect(isPrimitive(Infinity)).toBe(true);
  });

  it("returns true for booleans", () => {
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
  });

  it("returns false for null and undefined", () => {
    expect(isPrimitive(null)).toBe(false);
    expect(isPrimitive(undefined)).toBe(false);
  });

  it("returns false for objects and arrays", () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive({ a: 1 })).toBe(false);
    expect(isPrimitive([1, 2, 3])).toBe(false);
  });

  it("returns false for functions and symbols", () => {
    expect(isPrimitive(() => {})).toBe(false);
    expect(isPrimitive(Symbol("sym"))).toBe(false);
  });
});

describe("isFlatArrayOfPrimitives", () => {
  it("returns true for array of strings", () => {
    expect(isFlatArrayOfPrimitives(["a", "b", "c"])).toBe(true);
  });

  it("returns true for array of numbers", () => {
    expect(isFlatArrayOfPrimitives([1, 2, 3])).toBe(true);
  });

  it("returns true for array of booleans", () => {
    expect(isFlatArrayOfPrimitives([true, false, true])).toBe(true);
  });

  it("returns true for mixed array of primitives", () => {
    expect(isFlatArrayOfPrimitives([1, "a", false])).toBe(true);
  });

  it("returns false for array with non-primitives", () => {
    expect(isFlatArrayOfPrimitives([1, {}, "a"])).toBe(false);
    expect(isFlatArrayOfPrimitives([1, [2], "a"])).toBe(false);
    expect(isFlatArrayOfPrimitives([null, "a"])).toBe(false);
    expect(isFlatArrayOfPrimitives([undefined, "a"])).toBe(false);
  });

  it("returns false for non-array input", () => {
    expect(isFlatArrayOfPrimitives("not an array")).toBe(false);
    expect(isFlatArrayOfPrimitives(123)).toBe(false);
    expect(isFlatArrayOfPrimitives({})).toBe(false);
    expect(isFlatArrayOfPrimitives(null)).toBe(false);
    expect(isFlatArrayOfPrimitives(undefined)).toBe(false);
  });

  it("returns true for empty array", () => {
    expect(isFlatArrayOfPrimitives([])).toBe(true);
  });
});

describe("isObjectOfPrimitives", () => {
  it("returns true for object with only primitive values", () => {
    expect(isObjectOfPrimitives({ a: 1, b: "x", c: true })).toBe(true);
  });

  it("returns false for object with non-primitive values", () => {
    expect(isObjectOfPrimitives({ a: 1, b: {}, c: true })).toBe(false);
    expect(isObjectOfPrimitives({ a: [1, 2], b: "x" })).toBe(false);
    expect(isObjectOfPrimitives({ a: null, b: "x" })).toBe(false);
  });

  it("returns false for arrays", () => {
    expect(isObjectOfPrimitives([1, 2, 3])).toBe(false);
  });
  it("returns false for non-object input", () => {
    expect(isObjectOfPrimitives("string")).toBe(false);
    expect(isObjectOfPrimitives(123)).toBe(false);
    expect(isObjectOfPrimitives(true)).toBe(false);
    expect(isObjectOfPrimitives(null)).toBe(false);
    expect(isObjectOfPrimitives(undefined)).toBe(false);
  });
});
