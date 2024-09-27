"use server";

import { ApiResponse, DprShow } from "@/types";

const response: ApiResponse<DprShow | null> = {
  data: null,
  status: {
    code: 200,
    message: "TODO output correct content here",
  },
};

export const show = (): Promise<ApiResponse<DprShow | null>> => {
  return Promise.resolve(response);
};
