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

import { concatenateFieldsInOrder } from "@/util/concatenateFieldsInOrder";

describe("concatenateFieldsInOrder", () => {
  it("should concatenate specified fields in order", () => {
    const obj = {
      line1: "123 Main St",
      line2: "Apt 4B",
      town: "Springfield",
      county: "Some County",
      postcode: "12345",
      country: "USA",
    };
    const fields = ["line1", "line2", "town", "county", "postcode", "country"];
    const result = concatenateFieldsInOrder<string>(obj, fields);
    expect(result).toBe(
      "123 Main St, Apt 4B, Springfield, Some County, 12345, USA",
    );
  });

  it("should skip fields that are not present in the object", () => {
    const obj = {
      line1: "123 Main St",
      town: "Springfield",
      postcode: "12345",
    };
    const fields = ["line1", "line2", "town", "county", "postcode", "country"];
    const result = concatenateFieldsInOrder<string>(obj, fields);
    expect(result).toBe("123 Main St, Springfield, 12345");
  });

  it("should skip fields that have falsy values", () => {
    const obj = {
      line1: "123 Main St",
      line2: "",
      town: "Springfield",
      county: null,
      postcode: "12345",
      country: undefined,
    };
    const fields = ["line1", "line2", "town", "county", "postcode", "country"];
    const result = concatenateFieldsInOrder<string>(obj, fields);
    expect(result).toBe("123 Main St, Springfield, 12345");
  });

  it("should return an empty string if no fields are present in the object", () => {
    const obj = {};
    const fields = ["line1", "line2", "town", "county", "postcode", "country"];
    const result = concatenateFieldsInOrder<string>(obj, fields);
    expect(result).toBe("");
  });

  it("should return an empty string if fields array is empty", () => {
    const obj = {
      line1: "123 Main St",
      town: "Springfield",
      postcode: "12345",
    };
    const fields: string[] = [];
    const result = concatenateFieldsInOrder<string>(obj, fields);
    expect(result).toBe("");
  });

  it("should use the defined separator", () => {
    const obj = {
      first: "John",
      last: "Smith",
    };
    const fields = ["first", "last"];
    const result = concatenateFieldsInOrder<string>(obj, fields, "HELLO");
    expect(result).toBe("JohnHELLOSmith");
  });
});
