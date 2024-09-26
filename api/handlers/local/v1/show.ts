"use server";

import { ApiResponse, DprPublicApplicationDetails } from "@/types";

const response: ApiResponse<DprPublicApplicationDetails | null> = {
  data: null,
  status: {
    code: 200,
    message: "TODO output correct content here",
  },
};

export const show = (): Promise<
  ApiResponse<DprPublicApplicationDetails | null>
> => {
  return Promise.resolve(response);
};
