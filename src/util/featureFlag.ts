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
 * Generic function to compute enabled fields based on feature flags.
 * @param allFields - The complete list of fields.
 * @param envVar - The environment variable that contains the disabled fields (comma-separated).
 * @returns A subset of allFields excluding the fields listed in the environment variable.
 */
export const computeEnabledFields = (
  allFields: readonly string[],
  envVar: string | undefined,
): string[] => {
  const disabledFields = envVar?.split(",").filter(Boolean) ?? [];
  return allFields.filter((field) => !disabledFields.includes(field));
};

/**
 * Utility function to log enabled and disabled fields in development mode.
 * @param type - The type of search fields (e.g., "Comment", "Document", "Application").
 * @param disabledFields - The list of disabled fields.
 * @param enabledFields - The list of enabled fields.
 */
const logFields = (
  type: string,
  disabledFields: string[],
  enabledFields: string[],
) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Disabled ${type} Search Fields:`, disabledFields);
    console.log(`Enabled ${type} Search Fields:`, enabledFields);
  }
};

/**
 * Generic function to handle feature flags for a specific type.
 * @param type - The type of search fields (e.g., "Comment", "Document", "Application").
 * @param allFields - The complete list of fields.
 * @param envVar - The environment variable that contains the disabled fields (comma-separated).
 * @returns The enabled fields for the given type.
 */
export const handleFeatureFlags = (
  type: string,
  allFields: readonly string[],
  envVar: string | undefined,
): string[] => {
  const enabledFields = computeEnabledFields(allFields, envVar);
  const disabledFields = envVar?.split(",").filter(Boolean) ?? [];
  logFields(type, disabledFields, enabledFields);
  return enabledFields;
};

/**
 * Comment Search Fields
 */
export const COMMENT_SEARCH_FIELDS = [
  "query",
  "resultsPerPage",
  "page",
  "publishedAtFrom",
  "publishedAtTo",
  "sentiment",
] as const;

export const commentSearchFields = handleFeatureFlags(
  "Comment",
  COMMENT_SEARCH_FIELDS,
  process.env.COMMENT_FILTERING_DISABLED,
);

/**
 * Document Search Fields
 */
export const DOCUMENT_SEARCH_FIELDS = [
  "title",
  "author",
  "datePublished",
  "fileType",
] as const;

export const documentSearchFields = handleFeatureFlags(
  "Document",
  DOCUMENT_SEARCH_FIELDS,
  process.env.DOCUMENT_FILTERING_DISABLED,
);

/**
 * Application Search Fields
 */
export const APPLICATION_SEARCH_FIELDS = [
  "applicationId",
  "status",
  "submittedDate",
  "applicantName",
] as const;

export const applicationSearchFields = handleFeatureFlags(
  "Application",
  APPLICATION_SEARCH_FIELDS,
  process.env.APPLICATION_FILTERING_DISABLED,
);
