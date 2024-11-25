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
