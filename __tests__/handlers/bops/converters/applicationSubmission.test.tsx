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

import { filterSensitiveData } from "@/handlers/bops/converters/applicationSubmission";

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
