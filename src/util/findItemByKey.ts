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

/**
 * Type definition for an item that may have children.
 * @template T - The type of the item.
 */
type ItemWithChildren<T> = T & {
  key: string;
  children?: ItemWithChildren<T>[];
};

/**
 * Finds an item by a specified key, including nested items.
 *
 * @template T - The type of the items in the array.
 * @param {ItemWithChildren<T>[]} items - The nested array of items.
 * @param {string} key - The key to find.
 * @returns {ItemWithChildren<T> | undefined} The found item or undefined if not found.
 */
export const findItemByKey = <T>(
  items: ItemWithChildren<T>[],
  key: string,
): ItemWithChildren<T> | undefined => {
  for (const item of items) {
    if (item.key === key) {
      return item;
    }
    if (item.children) {
      const found = findItemByKey(item.children, key);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};
