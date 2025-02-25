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

import { slugify } from "@/util";

describe("slugify", () => {
  it("should convert a string to lowercase", () => {
    const result = slugify("Hello World");
    expect(result).toBe("hello-world");
  });

  it("should trim leading and trailing white space", () => {
    const result = slugify("  Hello World  ");
    expect(result).toBe("hello-world");
  });

  it("should replace spaces with hyphens", () => {
    const result = slugify("Hello World");
    expect(result).toBe("hello-world");
  });

  it("should remove consecutive hyphens", () => {
    const result = slugify("Hello   World");
    expect(result).toBe("hello-world");
  });

  it("should remove non-alphanumeric characters", () => {
    const result = slugify("Hello, World!");
    expect(result).toBe("hello-world");
  });

  it("should handle an empty string", () => {
    const result = slugify("");
    expect(result).toBe("");
  });

  it("should handle a string with only spaces", () => {
    const result = slugify("     ");
    expect(result).toBe("");
  });

  it("should handle a string with special characters only", () => {
    const result = slugify("!@#$%^&*()");
    expect(result).toBe("");
  });

  it("should handle a string with mixed characters", () => {
    const result = slugify("Hello World! 123");
    expect(result).toBe("hello-world-123");
  });

  it("should handle a string with multiple spaces and special characters", () => {
    const result = slugify("  Hello   World!  ");
    expect(result).toBe("hello-world");
  });
});
