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

import { addCouncilToString } from "@/util";

describe("addCouncilToString", () => {
  it("should add 'Council' to the end of the name if it doesn't contain 'council'", () => {
    expect(addCouncilToString("Camden")).toBe("Camden Council");
    expect(addCouncilToString("Barnet")).toBe("Barnet Council");
  });

  it("should not add 'Council' if the name already contains 'council'", () => {
    expect(addCouncilToString("Camden Council")).toBe("Camden Council");
    expect(addCouncilToString("Barnet Borough Council")).toBe(
      "Barnet Borough Council",
    );
  });

  it("should be case insensitive when checking for 'council'", () => {
    expect(addCouncilToString("Camden council")).toBe("Camden council");
    expect(addCouncilToString("BARNET COUNCIL")).toBe("BARNET COUNCIL");
  });

  it("should handle empty strings", () => {
    expect(addCouncilToString("")).toBe("");
  });

  it("should handle strings with only whitespace", () => {
    expect(addCouncilToString(" ")).toBe(" ");
  });
});
