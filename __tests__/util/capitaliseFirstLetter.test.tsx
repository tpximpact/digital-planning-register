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
