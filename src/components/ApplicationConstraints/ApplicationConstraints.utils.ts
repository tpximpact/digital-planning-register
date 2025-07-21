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
  PlanningConstraint,
  PlanningDesignation,
} from "@/types/odp-types/shared/Constraints";
import { DprDesignationConstraint } from ".";

/**
 * Prepares the constraints for the application.
 * It maps the constraints to the DprDesignationConstraint type. Since we're less prescriptive about the data structure,
 * we can use a simple mapping to ensure the data is in the correct format.
 * @param constraints
 * @returns
 */
export const prepareConstraints = (
  constraints: (PlanningDesignation | PlanningConstraint)[],
): DprDesignationConstraint[] => {
  const data: DprDesignationConstraint[] = [];
  constraints.map((constraint) => {
    data.push({
      ...constraint,
    });
  });
  return data;
};

/**
 * Removes constraints that do not intersect from the list of constraints.
 * @param constraints
 * @returns
 */
export const filterConstraints = (constraints: DprDesignationConstraint[]) => {
  return constraints.filter((constraint) => constraint.intersects);
};

/**
 * Gets the entity ID from a URL.
 * @param url
 * @returns number
 */
export const getEntityFromUrl = (url: string): number | null => {
  const match = url.match(/entity\/(\d+)/);
  return match ? Number(match[1]) : null;
};
