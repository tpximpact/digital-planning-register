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

import { findItemByKey } from "@/util/findItemByKey";

describe("findItemByKey", () => {
  const items = [
    {
      key: "item1",
      name: "Item 1",
      children: [
        {
          key: "item1-1",
          name: "Item 1-1",
          children: [
            {
              key: "item1-1-1",
              name: "Item 1-1-1",
            },
          ],
        },
      ],
    },
    {
      key: "item2",
      name: "Item 2",
    },
  ];

  it("should find an item by key", () => {
    const result = findItemByKey(items, "item1-1-1");
    expect(result).toEqual({
      key: "item1-1-1",
      name: "Item 1-1-1",
    });
  });

  it("should return undefined if the key is not found", () => {
    const result = findItemByKey(items, "nonexistent");
    expect(result).toBeUndefined();
  });

  it("should find an item at the top level", () => {
    const result = findItemByKey(items, "item2");
    expect(result).toEqual({
      key: "item2",
      name: "Item 2",
    });
  });

  it("should find an item at the second level", () => {
    const result = findItemByKey(items, "item1-1");
    expect(result).toEqual({
      key: "item1-1",
      name: "Item 1-1",
      children: [
        {
          key: "item1-1-1",
          name: "Item 1-1-1",
        },
      ],
    });
  });
});
