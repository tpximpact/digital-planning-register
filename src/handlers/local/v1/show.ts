"use server";

import { ApiResponse, DprShowApiResponse } from "@/types";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const response = (reference: string): ApiResponse<DprShowApiResponse> => {
  let application = null;

  // it can never be ldc or determined because comments are disabled there!
  if (reference === "TEST-C0MNT-F10W") {
    application = generateDprApplication({
      applicationType: "pp",
      applicationStatus: "in_assessment",
      decision: null,
    });
  } else {
    application = generateDprApplication();
  }

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
