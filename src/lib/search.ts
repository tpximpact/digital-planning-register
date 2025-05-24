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

import { UnknownSearchParams } from "@/types";

/**
 * When using the searchParams object, it can be of type
 * string | string[] | undefined. This function helps to extract
 * the value from the searchParams object based on the key.
 * It handles the case where the value can be an array or a string.
 * If the value is an array, it returns the first element.
 * If the value is a string, it returns the string directly.
 * If the value is undefined, it returns undefined.
 * If the key is not found, it returns undefined.
 * @param searchParams
 * @param key
 * @returns
 */
export const getValueFromUnknownSearchParams = (
  searchParams: UnknownSearchParams,
  key: string,
): string | undefined => {
  if (!searchParams || !key) {
    return undefined; // Return undefined if searchParams or key is not provided
  }
  // Check if the key exists in the searchParams
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0]; // Use the first element if it's an array
  }

  return value; // Use the value directly if it's a string or undefined
};

/**
 *
 * @param searchParams
 * @param excludedKeys
 * @returns
 */
export const filterSearchParams = (
  searchParams: URLSearchParams,
  excludedKeys: string[],
): URLSearchParams => {
  return new URLSearchParams(
    Array.from(searchParams.entries()).filter(
      ([key]) => !excludedKeys.includes(key),
    ),
  );
};
