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

import { flattenObject } from "@/util";

interface TestItem {
  title: string;
  children?: TestItem[];
}

const testData: TestItem[] = [
  {
    title: "Title 1",
    children: [
      {
        title: "Title 1-1",
      },
      {
        title: "Title 1-2",

        children: [
          {
            title: "Title 1-2-1",
          },
        ],
      },
    ],
  },
  {
    title: "Title 2",
  },
];

describe("flattenObject", () => {
  it("should return a flat array of titles", () => {
    const result = flattenObject(testData, "title");
    expect(result).toEqual([
      "Title 1",
      "Title 1-1",
      "Title 1-2",
      "Title 1-2-1",
      "Title 2",
    ]);
  });

  it("should return an empty array if the key does not exist", () => {
    const result = flattenObject(testData, "nonexistent" as keyof TestItem);
    expect(result).toEqual([]);
  });

  it("should handle an empty array", () => {
    const result = flattenObject([], "title");
    expect(result).toEqual([]);
  });
});
