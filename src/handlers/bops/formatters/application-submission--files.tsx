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
