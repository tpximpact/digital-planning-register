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

import { getUnknownValue } from "@/util";

describe("getUnknownValue", () => {
  const testObj = {
    a: {
      b: {
        c: 42,
        d: "hello",
      },
      arr: [1, 2, 3],
    },
    x: "top",
  };

  it("returns value for valid top-level key", () => {
    expect(getUnknownValue(testObj, ["x"])).toBe("top");
  });

  it("returns value for valid nested path", () => {
    expect(getUnknownValue(testObj, ["a", "b", "c"])).toBe(42);
    expect(getUnknownValue(testObj, ["a", "b", "d"])).toBe("hello");
  });

  it("returns value for array index", () => {
    expect(getUnknownValue(testObj, ["a", "arr", 1])).toBe(2);
  });

  it("returns undefined for invalid path", () => {
    expect(getUnknownValue(testObj, ["a", "missing"])).toBeUndefined();
    expect(getUnknownValue(testObj, ["not", "found"])).toBeUndefined();
    expect(getUnknownValue(testObj, ["a", "arr", 10])).toBeUndefined();
  });

  it("returns undefined for non-object input", () => {
    expect(getUnknownValue(null, ["x"])).toBeUndefined();
    expect(getUnknownValue(undefined, ["x"])).toBeUndefined();
    expect(getUnknownValue("string", ["x"])).toBeUndefined();
    expect(getUnknownValue(123, ["x"])).toBeUndefined();
  });

  it("returns the original object for empty path", () => {
    expect(getUnknownValue(testObj, [])).toEqual(testObj);
  });

  it("works with numeric keys on objects", () => {
    const obj = { 1: "one", 2: "two" };
    expect(getUnknownValue(obj, [2])).toBe("two");
  });
});
