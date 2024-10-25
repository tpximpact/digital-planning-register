"use server";

import { ApiResponse, DprApplication } from "@/types";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const response = (reference: string): ApiResponse<DprApplication> => {
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
): Promise<ApiResponse<DprApplication>> => {
  return Promise.resolve(response(reference));
};
