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
