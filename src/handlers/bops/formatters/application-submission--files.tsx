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
// allowing any here because this code will be replaced soon
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Returns description and value from first entry of type for each file
 *
 * "files": [
 *   {
 *     "name": "https://api.editor.planx.dev/file/private/d4pceqti/Proposed%20Lower%20Ground%20Floor%20Plan.PDF",
 *     "type": [
 *       {
 *         "value": "heritageStatement",
 *         "description": "Heritage Statement"
 *       },
 *       {
 *         "value": "sitePlan.existing",
 *         "description": "Site plan - existing"
 *       },
 *       {
 *         "value": "sitePlan.proposed",
 *         "description": "Site plan - proposed"
 *       },
 *       {
 *         "value": "floorPlan.existing",
 *         "description": "Floor plan - existing"
 *       },
 *       {
 *         "value": "floorPlan.proposed",
 *         "description": "Floor plan - proposed"
 *       },
 *       {
 *         "value": "elevations.existing",
 *         "description": "Elevations - existing"
 *       },
 *       {
 *         "value": "elevations.proposed",
 *         "description": "Elevations - proposed"
 *       }
 *     ]
 *   }
 * ],
 * @param value
 * @returns
 */
export const BopsFiles = (files: any) => {
  if (!files || !Array.isArray(files)) return [];

  return files.map((file: any) => {
    const firstType = file.type?.[0];
    const fileDecoded = decodeURIComponent(file?.name)?.split("/");

    return {
      description: "File upload",
      value: `${firstType?.description}: ${fileDecoded[fileDecoded.length - 1]}`,
    };
  });
};
