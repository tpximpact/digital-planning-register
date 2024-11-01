"use server";

import { getAppConfig } from "@/config";
import {
  ApiResponse,
  DprDocument,
  DprDocumentsApiResponse,
  SearchParams,
} from "@/types";
import {
  generateDocument,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";

const responseQuery = (
  searchParams?: SearchParams,
): ApiResponse<DprDocumentsApiResponse> => {
  const appConfig = getAppConfig();
  const resultsPerPage = appConfig.defaults.resultsPerPage;

  const documents = [
    {
      url: "/application-form",
      title: "Application form",
      metadata: {
        contentType: "text/html",
      },
    },
    ...generateNResults<DprDocument>(resultsPerPage, generateDocument),
  ];

  // if we've done a search just rename the first result to match the query
  if (searchParams?.query) {
    documents[0].title = searchParams?.query;
  }

  return {
    data: {
      files: documents,
      pagination: generatePagination(searchParams?.page ?? 1),
    },
    status: {
      code: 200,
      message: "",
    },
  };
};

export const documents = (
  council: string,
  reference: string,
  searchParams?: SearchParams,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> => {
  return Promise.resolve(responseQuery(searchParams));
};
