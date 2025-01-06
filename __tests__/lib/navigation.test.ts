import { createPathFromParams } from "@/lib/navigation";

describe("createPathFromParams", () => {
  it("returns an empty string if reference is set but council is not", () => {
    const params = { reference: "12345" };
    const result = createPathFromParams(params);
    expect(result).toBe("");
  });

  it("creates a path with only the council parameter", () => {
    const params = { council: "camden" };
    const result = createPathFromParams(params);
    expect(result).toBe("/camden");
  });

  it("creates a path with both council and reference parameters", () => {
    const params = { council: "camden", reference: "12345" };
    const result = createPathFromParams(params);
    expect(result).toBe("/camden/12345");
  });

  it("creates a path with a base URL and council parameter", () => {
    const params = { council: "camden" };
    const url = "search";
    const result = createPathFromParams(params, url);
    expect(result).toBe("/camden/search");
  });

  it("creates a path with a base URL, council, and reference parameters", () => {
    const params = { council: "camden", reference: "12345" };
    const url = "search";
    const result = createPathFromParams(params, url);
    expect(result).toBe("/camden/12345/search");
  });

  it("returns the base URL if no parameters are provided", () => {
    const url = "search";
    const result = createPathFromParams(undefined, url);
    expect(result).toBe("/search");
  });

  it("returns an empty string if no parameters and no base URL are provided", () => {
    const result = createPathFromParams();
    expect(result).toBe("");
  });
});
