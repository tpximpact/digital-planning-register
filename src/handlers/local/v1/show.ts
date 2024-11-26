"use server";

import { ApiResponse, DprShowApiResponse } from "@/types";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const response = (reference: string): ApiResponse<DprShowApiResponse> => {
  const application = generateDprApplication();
  application.application.reference = reference;

  // it can never be ldc because comments are disabled there!
  if (reference === "TEST-C0MNT-F10W") {
    const application = generateDprApplication({ applicationType: "pp" });
    application.application.status = "in_assessment";
  }

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
