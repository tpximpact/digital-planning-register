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

/**
 * Utility function used when working with unknown
 * objects to return values in a typesafe way
 */
export const getUnknownValue = <T = unknown>(
  obj: unknown,
  path: (string | number)[],
): T | undefined => {
  let current: unknown = obj;

  for (const key of path) {
    if (typeof current === "object" && current !== null && key in current) {
      current = (current as Record<string | number, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current as T;
};
