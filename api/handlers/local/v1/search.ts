"use server";

import {
  ApiResponse,
  DprPublicApplicationListings,
  SearchParams,
} from "@/types";

const response: ApiResponse<DprPublicApplicationListings | null> = {
  data: null,
  status: {
    code: 200,
    message: "TODO output correct content here",
  },
};

export const search = (
  search?: SearchParams,
): Promise<ApiResponse<DprPublicApplicationListings | null>> => {
  if (search?.query) {
    return Promise.resolve(response);
  }

  if (search?.type === "dsn") {
    return Promise.resolve(response);
  }

  return Promise.resolve(response);
};
