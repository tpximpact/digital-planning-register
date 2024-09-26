"use server";

import { ApiResponse, DprPublicApplicationDocuments } from "@/types";

const response: ApiResponse<DprPublicApplicationDocuments | null> = {
  data: null,
  status: {
    code: 200,
    message: "TODO output correct content here",
  },
};

export const documents = (): Promise<
  ApiResponse<DprPublicApplicationDocuments | null>
> => {
  return Promise.resolve(response);
};
