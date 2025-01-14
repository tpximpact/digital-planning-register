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
