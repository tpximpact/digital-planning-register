"use server";

import { ApiResponse, DprDocuments } from "@/types";

const response: ApiResponse<DprDocuments | null> = {
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

export const documents = (): Promise<ApiResponse<DprDocuments | null>> => {
  return Promise.resolve(response);
};
