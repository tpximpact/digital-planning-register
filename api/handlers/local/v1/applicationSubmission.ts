"use server";

import { ApiResponse, DprApplicationSubmission } from "@/types";

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
