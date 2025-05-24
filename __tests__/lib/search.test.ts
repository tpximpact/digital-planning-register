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

import "@testing-library/jest-dom";
import {
  getValueFromUnknownSearchParams,
  filterSearchParams,
} from "@/lib/search";
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

describe("filterSearchParams", () => {
  it("removes excluded keys from URLSearchParams", () => {
    const params = new URLSearchParams({
      foo: "1",
      bar: "2",
      baz: "3",
    });
    const filtered = filterSearchParams(params, ["bar"]);
    expect(filtered.get("foo")).toBe("1");
    expect(filtered.get("bar")).toBeNull();
    expect(filtered.get("baz")).toBe("3");
  });

  it("returns all params if excludedKeys is empty", () => {
    const params = new URLSearchParams({ a: "x", b: "y" });
    const filtered = filterSearchParams(params, []);
    expect(filtered.get("a")).toBe("x");
    expect(filtered.get("b")).toBe("y");
  });

  it("returns empty params if all keys are excluded", () => {
    const params = new URLSearchParams({ a: "1", b: "2" });
    const filtered = filterSearchParams(params, ["a", "b"]);
    expect(Array.from(filtered.keys())).toHaveLength(0);
  });

  it("handles multiple values for the same key", () => {
    const params = new URLSearchParams();
    params.append("foo", "1");
    params.append("foo", "2");
    params.append("bar", "3");
    const filtered = filterSearchParams(params, ["bar"]);
    expect(filtered.getAll("foo")).toEqual(["1", "2"]);
    expect(filtered.get("bar")).toBeNull();
  });
});
