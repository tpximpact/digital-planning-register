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

import { computeEnabledFields } from "@/config/featureFlag";

describe("computeEnabledFields", () => {
  it("returns all fields when envVar is undefined", () => {
    const all = ["sentiment", "publishedAtTo", "publishedAtFrom"];
    expect(computeEnabledFields(all, undefined)).toEqual(all);
  });

  it("filters out fields listed in envVar", () => {
    const all = ["sentiment", "publishedAtTo", "publishedAtFrom"];
    const envVar = "publishedAtTo,publishedAtFrom";
    expect(computeEnabledFields(all, envVar)).toEqual(["sentiment"]);
  });

  it("returns empty array when all fields disabled", () => {
    const all = ["sentiment", "publishedAtTo", "publishedAtFrom", "query"];
    const envVar = "sentiment,publishedAtTo,publishedAtFrom,query";
    expect(computeEnabledFields(all, envVar)).toEqual([]);
  });
});
