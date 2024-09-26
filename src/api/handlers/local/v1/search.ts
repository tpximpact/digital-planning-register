"use server";

import { ApiResponse, SearchParams } from "@/types";

const response: ApiResponse<Object | null> = {
  data: {},
  status: {
    code: 200,
    message: "TODO output correct content here",
  },
};

export const search = (
  search?: SearchParams,
): Promise<ApiResponse<Object | null>> => {
  if (search?.query) {
    return Promise.resolve(response);
  }

  if (search?.type === "dsn") {
    return Promise.resolve(response);
  }

  return Promise.resolve(response);
};
