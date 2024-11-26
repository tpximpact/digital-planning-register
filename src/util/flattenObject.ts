type ItemWithChildren<T> = T & { children?: ItemWithChildren<T>[] };

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
