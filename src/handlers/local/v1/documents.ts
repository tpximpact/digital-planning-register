"use server";

import { ApiResponse, DprDocumentsApiResponse } from "@/types";

const response: ApiResponse<DprDocumentsApiResponse | null> = {
  data: {
    pagination: {
      results: 0,
      total_results: 0,
    },
    files: [
      {
        url: "/public/24-00135-HAPP/application-form",
        title: "Application form",
        metadata: {
          contentType: "text/html",
        },
      },
    ],
  },
  status: {
    code: 200,
    message: "",
  },
};

export const documents = (): Promise<
  ApiResponse<DprDocumentsApiResponse | null>
> => {
  return Promise.resolve(response);
};
