"use server";

import { ApiResponse, DprApiShow } from "@/types";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const response = (reference: string): ApiResponse<DprApiShow | null> => {
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
): Promise<ApiResponse<DprApiShow | null>> => {
  return Promise.resolve(response(reference));
};
