/**
 * Type definition for an item that may have children.
 * @template T - The type of the item.
 */
type ItemWithChildren<T> = T & { children?: ItemWithChildren<T>[] };

/**
 * Flattens a nested array of objects and collects the values of a specified key.
 *
 * @template T - The type of the items in the array.
 * @template K - The key whose values are to be collected.
 * @param {ItemWithChildren<T>[]} items - The nested array of items.
 * @param {K} key - The key whose values are to be collected.
 * @returns {T[K][]} An array of values corresponding to the specified key.
 *
 * @example
 * // Define a type for the items
 * type Item = { id: number; name: string };
 *
 * // Define a nested array of items
 * const items: ItemWithChildren<Item>[] = [
 *   { id: 1, name: 'Item 1', children: [{ id: 2, name: 'Item 2' }] },
 *   { id: 3, name: 'Item 3' },
 * ];
 *
 * // Collect all 'id' values
 * const ids = flattenObject(items, 'id'); // [1, 2, 3]
 */
export const flattenObject = <T, K extends keyof T>(
  items: ItemWithChildren<T>[],
  key: K,
): T[K][] => {
  const result: T[K][] = [];

  const collectValues = (items: ItemWithChildren<T>[]) => {
    items.forEach((item) => {
      if (item[key] !== undefined) {
        result.push(item[key]);
      }
      if (item.children) {
        collectValues(item.children);
      }
    });
  };

  collectValues(items);
  return result;
};
