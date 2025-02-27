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
