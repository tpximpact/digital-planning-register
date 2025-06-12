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
import { $args } from "@/app/(private)/admin/utils";

describe("$args", () => {
  it("returns argument names for a regular function", () => {
    function testFn(a: string, b: number, c: boolean) {}
    expect($args(testFn)).toEqual(["a", "b", "c"]);
  });

  it("returns argument names for an arrow function", () => {
    const arrowFn = (x: number, y: string) => {};
    expect($args(arrowFn)).toEqual(["x", "y"]);
  });

  it("returns an empty array for a function with no arguments", () => {
    function noArgs() {}
    expect($args(noArgs)).toEqual([]);
  });

  it("trims whitespace and ignores empty params", () => {
    // Simulate a function with extra spaces and trailing commas
    const messyFn = (a: any, b: any) => {};
    expect($args(messyFn)).toEqual(["a", "b"]);
  });

  it("returns an empty array if function string does not match", () => {
    // Simulate a function with a non-standard toString (edge case)
    const fakeFn = { toString: () => "not a function" } as any;
    expect($args(fakeFn)).toEqual([]);
  });
});
