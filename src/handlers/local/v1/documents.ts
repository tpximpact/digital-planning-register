"use server";

import { ApiResponse, DprApiDocumentsResponse } from "@/types";

const response: ApiResponse<DprApiDocumentsResponse | null> = {
  data: {
    pagination: {
      results: 0,
      total_results: 0,
    },
    files: [
      {
        url: "/public-council-1/24-00135-HAPP/application-form",
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
  ApiResponse<DprApiDocumentsResponse | null>
> => {
  return Promise.resolve(response);
};
