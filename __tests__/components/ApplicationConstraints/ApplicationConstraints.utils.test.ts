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
import {
  prepareConstraints,
  filterConstraints,
  getEntityFromUrl,
} from "@/components/ApplicationConstraints/ApplicationConstraints.utils";
import type {
  PlanningConstraint,
  PlanningDesignation,
} from "digital-planning-data-schemas/types/shared/Constraints.ts";

// NonIntersectingPlanningDesignation
const testNonIntersectingPlanningDesignation: PlanningDesignation = {
  value: "nature.SAC",
  description: "Special Area of Conservation (SAC)",
  intersects: false,
};

// IntersectingPlanningDesignation
const testIntersectingPlanningDesignation: PlanningDesignation = {
  value: "articleFour",
  description: "Article 4 direction area",
  intersects: true,
  entities: [
    {
      name: "Whole District excluding the Town of Chesham - Poultry production.",
      description:
        "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
      source: {
        text: "Planning Data",
        url: "https://www.planning.data.gov.uk/entity/7010002192",
      },
    },
    {
      name: "Stock Lane - Classified Unnumbered",
      source: {
        text: "Ordnance Survey MasterMap Highways",
      },
    },
  ],
};

// NonIntersectingPlanningConstraint
const testNonIntersectingPlanningConstraint: PlanningConstraint = {
  value: "any value",
  description: "any description",
  intersects: false,
};

// IntersectingPlanningConstraint
const testIntersectingPlanningConstraint: PlanningConstraint = {
  value: "any value",
  description: "any description",
  intersects: true,
  entities: [
    {
      name: "Whole District excluding the Town of Chesham - Poultry production.",
      description:
        "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
      source: {
        text: "Planning Data",
        url: "https://www.planning.data.gov.uk/entity/7010002192",
      },
    },
    {
      name: "Stock Lane - Classified Unnumbered",
      source: {
        text: "Ordnance Survey MasterMap Highways",
      },
    },
  ],
};

describe("ApplicationConstraints.utils", () => {
  describe("prepareConstraints", () => {
    it("maps constraints to DprDesignationConstraint[]", () => {
      const constraints = [
        testNonIntersectingPlanningDesignation,
        testIntersectingPlanningDesignation,
        testNonIntersectingPlanningConstraint,
        testIntersectingPlanningConstraint,
      ];
      const result = prepareConstraints(constraints);
      expect(result).toHaveLength(4);
      expect(result[0]).toMatchObject(testNonIntersectingPlanningDesignation);
      expect(result[1]).toMatchObject(testIntersectingPlanningDesignation);
    });
  });

  describe("filterConstraints", () => {
    it("returns only constraints where intersects is true", () => {
      const constraints = [
        testNonIntersectingPlanningDesignation,
        testIntersectingPlanningDesignation,
        testNonIntersectingPlanningConstraint,
        testIntersectingPlanningConstraint,
      ];
      const result = filterConstraints(constraints);
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        testIntersectingPlanningDesignation,
        testIntersectingPlanningConstraint,
      ]);
    });
  });

  describe("getEntityFromUrl", () => {
    it("extracts the entity ID from a valid URL", () => {
      const url = "https://www.planning.data.gov.uk/entity/1234567";
      expect(getEntityFromUrl(url)).toBe(1234567);
    });

    it("returns null if the URL does not contain an entity ID", () => {
      const url = "https://www.planning.data.gov.uk/other/1234567";
      expect(getEntityFromUrl(url)).toBeNull();
    });

    it("returns null for malformed URLs", () => {
      expect(getEntityFromUrl("not a url")).toBeNull();
      expect(getEntityFromUrl("entity/")).toBeNull();
      expect(getEntityFromUrl("entity/abc")).toBeNull();
    });
  });
});
