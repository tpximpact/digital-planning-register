"use server";

import { ApiResponse, DprApiDocuments } from "@/types";
import {
  generateDocument,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";

const response: ApiResponse<DprApiDocuments | null> = {
  data: {
    pagination: generatePagination(),
    files: [
      {
        url: "/public/24-00135-HAPP/application-form",
        title: "Application form",
        metadata: {
          contentType: "text/html",
        },
      },
      ...generateNResults(20, generateDocument),
    ],
  },
  status: {
    code: 200,
    message: "",
  },
};

export const documents = (): Promise<ApiResponse<DprApiDocuments | null>> => {
  return Promise.resolve(response);
};
