/**
 * Concatenates specified fields of an object with values, separated by a comma.
 * @param obj - The object containing the fields.
 * @param fields - The array of field names in the order to concatenate.
 * @returns A concatenated string of field values.
 */
export const concatenateFieldsInOrder = (
  obj: Record<string, any>,
  fields: string[],
): string => {
  return fields
    .filter((field) => obj[field]) // Filter out fields that are not present or have falsy values
    .map((field) => obj[field]) // Map the remaining fields to their values
    .join(", "); // Join the values with a comma
};
