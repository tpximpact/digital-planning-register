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

import type { Responses } from "digital-planning-data-schemas/types/shared/Responses.ts";

/**
 * Processes the application form by filtering sensitive data and merging application data.
 * @param applicationForm - The application form data.
 * @returns The processed application form data.
 */
export const processApplicationForm = (applicationForm: unknown) => {
  const filteredData = filterSensitiveData(applicationForm);
  const mergeData = mergeApplicationData(filteredData);
  return mergeData;
};

/**
 * Filters out sensitive data from the application form.
 * @param applicationForm - The application form data.
 * @returns The filtered application form data.
 */
export const filterSensitiveData = (applicationForm: unknown): unknown => {
  if (
    typeof applicationForm === "object" &&
    applicationForm !== null &&
    "responses" in applicationForm &&
    Array.isArray((applicationForm as { responses?: unknown }).responses)
  ) {
    const { responses, ...rest } = applicationForm as { responses: Responses };
    // Filter out responses where question contains 'disab'
    const filteredResponses = responses.filter(
      (response) => !response.question?.toLowerCase().includes("disab"),
    );
    // Return new object with filtered responses
    return { ...rest, responses: filteredResponses };
  }
};

/**
 * Move everything in submission.data to submission
 * @param applicationForm
 * @returns
 */
export const mergeApplicationData = (applicationForm: unknown): unknown => {
  if (
    typeof applicationForm === "object" &&
    applicationForm !== null &&
    "data" in applicationForm &&
    typeof (applicationForm as { data?: unknown }).data === "object" &&
    (applicationForm as { data?: unknown }).data !== null
  ) {
    const { data, ...rest } = applicationForm as {
      data: Record<string, unknown>;
    };
    return { ...data, ...rest };
  }
  return applicationForm;
};

/**
 * Checks if a value is a primitive type (string, number, or boolean).
 * @param val - The value to check.
 * @returns True if the value is a primitive type, false otherwise.
 */
export const isPrimitive = (val: unknown): val is string | number | boolean => {
  return (
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean"
  );
};

/**
 * Checks if a value is a one-dimensional array containing only primitives.
 * @param arr - The value to check.
 * @returns True if arr is an array and every element is a primitive, false otherwise.
 */
export const isFlatArrayOfPrimitives = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.every(isPrimitive);
};

/**
 * Checks if an object is a record of primitive values.
 * @param obj - The object to check.
 * @returns True if the object is a record of primitive values, false otherwise.
 */
export const isObjectOfPrimitives = (obj: unknown): boolean => {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return false;
  }
  return Object.values(obj).every((v) => isPrimitive(v));
};
