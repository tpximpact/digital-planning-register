"use server";

import { ApiResponse, DprDocuments } from "@/types";

const response: ApiResponse<DprDocuments | null> = {
  data: null,
  status: {
    code: 200,
    message: "TODO output correct content here",
  },
};

export const documents = (): Promise<ApiResponse<DprDocuments | null>> => {
  return Promise.resolve(response);
};
