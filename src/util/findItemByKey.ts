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
