import { ApiResponse } from "@/types";

export function apiReturnError(detail: string): ApiResponse<null> {
  return {
    data: null,
    status: {
      code: 400,
      message: "Bad request",
      ...(detail && { detail }),
    },
  };
}
