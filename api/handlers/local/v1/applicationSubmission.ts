"use server";

import { ApiResponse, DprApplicationSubmission, SearchParams } from "@/types";

const response: ApiResponse<DprApplicationSubmission | null> = {
  data: null,
  status: {
    code: 200,
    message: "TODO output correct content here",
  },
};

export const applicationSubmission = (): Promise<
  ApiResponse<DprApplicationSubmission | null>
> => {
  return Promise.resolve(response);
};
