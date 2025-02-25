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
