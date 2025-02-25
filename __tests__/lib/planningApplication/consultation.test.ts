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

import { getCommentsAllowed } from "@/lib/planningApplication/consultation";
import { DprPlanningApplication } from "@/types";

describe("getCommentsAllowed", () => {
  it('should return false for "ldc" application type', () => {
    const applicationType: DprPlanningApplication["applicationType"] = "ldc";
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(false);
  });

  it('should return true for non-"ldc" application types', () => {
    const applicationTypes: DprPlanningApplication["applicationType"][] = [
      "pp.full",
      "pa.part1.classA",
      "advertConsent",
      "amendment",
      "approval",
    ];

    applicationTypes.forEach((type) => {
      const result = getCommentsAllowed(type);
      expect(result).toBe(true);
    });
  });

  it("should return true for an unknown application type", () => {
    const applicationType: any = "unknownType.part1.classA";
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(true);
  });

  it("should return true for an empty application type", () => {
    const applicationType: any = "";
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(true);
  });

  it("should return true for a null application type", () => {
    const applicationType: any = null;
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(true);
  });

  it("should return true for an undefined application type", () => {
    const applicationType: any = undefined;
    const result = getCommentsAllowed(applicationType);
    expect(result).toBe(true);
  });
});
