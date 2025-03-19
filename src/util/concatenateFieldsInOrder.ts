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
 * Concatenates specified fields of an object with values, separated by a comma.
 * @param obj - The object containing the fields.
 * @param fields - The array of field names in the order to concatenate.
 * @returns A concatenated string of field values.
 */
export const concatenateFieldsInOrder = (
  obj: object,
  fields: string[],
  separator: string = ", ",
): string => {
  const data = fields
    .map((key) => {
      if (obj && obj.hasOwnProperty(key)) {
        const value = obj[key as keyof object];
        return value ?? "";
      }
    })
    .filter(Boolean);
  return data.join(separator).trim();
};
