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

import { addCouncilToName } from "@/util";

describe("addCouncilToName", () => {
  it("should add 'Council' to the end of the name if it doesn't contain 'council'", () => {
    expect(addCouncilToName("Camden")).toBe("Camden Council");
    expect(addCouncilToName("Barnet")).toBe("Barnet Council");
  });

  it("should not add 'Council' if the name already contains 'council'", () => {
    expect(addCouncilToName("Camden Council")).toBe("Camden Council");
    expect(addCouncilToName("Barnet Borough Council")).toBe(
      "Barnet Borough Council",
    );
  });

  it("should be case insensitive when checking for 'council'", () => {
    expect(addCouncilToName("Camden council")).toBe("Camden council");
    expect(addCouncilToName("BARNET COUNCIL")).toBe("BARNET COUNCIL");
  });

  it("should handle empty strings", () => {
    expect(addCouncilToName("")).toBe("");
  });

  it("should handle strings with only whitespace", () => {
    expect(addCouncilToName(" ")).toBe(" ");
  });
});
