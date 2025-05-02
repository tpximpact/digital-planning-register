/**
 * All available filter fields for the comments search form.
 */
export const COMMENT_SEARCH_FIELDS = [
  "query",
  "resultsPerPage",
  "page",
  "publishedAtFrom",
  "publishedAtTo",
  "sentiment",
] as const;

/**
 * Filters out any fields that are listed in disabledFields.
 * @param allFields - The complete list of fields.
 * @param disabledFields - Fields to remove.
 * @returns A subset of allFields excluding disabledFields.
 */
export const getEnabledFields = (
  allFields: readonly string[],
  disabledFields: string[],
) => {
  return allFields.filter((field) => !disabledFields.includes(field));
};

/**
 * Reads the `COMMENT_FILTERING_DISABLED` env var (comma-separated list)
 * and returns an array of disabled field names.
 */
export const disabledCommentSearchFields =
  process.env.COMMENT_FILTERING_DISABLED?.split(",").filter(Boolean) ?? [];

/**
 * Computed list of enabled comment filter fields, based on feature flags.
 */
export const commentSearchFields = getEnabledFields(
  COMMENT_SEARCH_FIELDS,
  disabledCommentSearchFields,
);

if (process.env.NODE_ENV === "development") {
  console.log("Disabled Comment Search Fields:", disabledCommentSearchFields);
  console.log("Enabled Comment Search Fields:", commentSearchFields);
}

// /**
//  * Below are the placeholders for the future feature flags (documents and application search)
//  */

// /**
//  * Placeholder for document search feature flags.
//  * Extend DOCUMENT_SEARCH_FIELDS.
//  */
// export const DOCUMENT_SEARCH_FIELDS = [] as const;
// export const disabledDocumentSearchFields =
//   process.env.DOCUMENT_FILTERING_DISABLED?.split(",").filter(Boolean) ?? [];

// export const documentSearchFields = getEnabledFields(
//   DOCUMENT_SEARCH_FIELDS,
//   disabledDocumentSearchFields,
// );

// if (process.env.NODE_ENV === "development") {
//   console.log("Disabled Document Search Fields:", disabledDocumentSearchFields);
//   console.log("Enabled Document Search Fields:", documentSearchFields);
// }

// /**
//  * Placeholder for application search feature flags.
//  * Extend APPLICATION_SEARCH_FIELDS.
//  */
// export const APPLICATION_SEARCH_FIELDS = [] as const;
// export const disabledApplicationSearchFields =
//   process.env.APPLICATION_FILTERING_DISABLED?.split(",").filter(Boolean) ?? [];
// export const applicationSearchFields = getEnabledFields(
//   APPLICATION_SEARCH_FIELDS,
//   disabledApplicationSearchFields,
// );

// if (process.env.NODE_ENV === "development") {
//   console.log(
//     "Disabled Application Search Fields:",
//     disabledApplicationSearchFields,
//   );
//   console.log("Enabled Application Search Fields:", applicationSearchFields);
// }
