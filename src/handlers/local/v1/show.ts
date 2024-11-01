"use server";

import { ApiResponse, DprShowApiResponse } from "@/types";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const response = (reference: string): ApiResponse<DprShowApiResponse> => {
  const application = generateDprApplication();
  application.application.reference = reference;

  return {
    data: application,
    status: {
      code: 200,
      message: "",
    },
  };
};

export const show = (
  council: string,
  reference: string,
): Promise<ApiResponse<DprShowApiResponse | null>> => {
  return Promise.resolve(response(reference));
};
