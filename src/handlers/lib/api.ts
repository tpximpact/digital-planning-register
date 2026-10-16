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

import { ApiResponse } from "@/types";

/**
 * Builds an error response. `detail` is only included when there is one.
 */
export function apiError(
  code: number,
  message: string,
  detail?: unknown,
): ApiResponse<null> {
  return {
    data: null,
    status: {
      code,
      message,
      ...(detail ? { detail } : {}),
    },
  } as ApiResponse<null>;
}

/**
 * 400 Bad request
 */
export function apiReturnError(detail: string): ApiResponse<null> {
  return apiError(400, "Bad request", detail);
}

/**
 * Turns whatever an upstream put in `detail` (string or object) into a string.
 */
export function detailMessage(detail: unknown, fallback: string): string {
  if (!detail) return fallback;
  return typeof detail === "string" ? detail : JSON.stringify(detail);
}

/**
 * Returns the default pagination
 */
export const defaultPagination = {
  resultsPerPage: 0,
  currentPage: 1,
  totalPages: 1,
  totalResults: 0,
  totalAvailableItems: 0,
};
