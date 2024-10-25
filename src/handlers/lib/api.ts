import { ApiResponse } from "@/types";

export function apiReturnError(detail: string): ApiResponse<undefined> {
  return {
    status: {
      code: 400,
      message: "Bad request",
      ...(detail && { detail }),
    },
  };
}

/**
 * Returns the default pagination
 */
export const defaultPagination = {
  page: 1,
  results: 0,
  from: 0,
  to: 0,
  total_pages: 1,
  total_results: 0,
};
