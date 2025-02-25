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

import { formatTag } from "@/util";

describe("formatTag", () => {
  it("should format tags with a dot", () => {
    const tag = "testPlan.suggested";
    const formattedTag = formatTag(tag);
    expect(formattedTag).toBe("Suggested Test Plan");
  });

  it("should format tags without a dot", () => {
    const tag = "testAndWorkForm";
    const formattedTag = formatTag(tag);
    expect(formattedTag).toBe("Test And Work Form");
  });

  it("should format tags with uppercase letters", () => {
    const tag = "testPlanSuggested";
    const formattedTag = formatTag(tag);
    expect(formattedTag).toBe("Test Plan Suggested");
  });

  it("should handle empty tags", () => {
    const tag = "";
    const formattedTag = formatTag(tag);
    expect(formattedTag).toBe("");
  });
});
