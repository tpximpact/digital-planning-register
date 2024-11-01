"use server";

import { ApiResponse, DprApplicationSubmissionApiResponse } from "@/types";
import { generateDprApplication } from "@mocks/dprApplicationFactory";
import { generateApplicationSubmission } from "@mocks/dprApplicationSubmission";

/**
 * @todo submission should be generateApplicationSubmission
 */
const responseQuery = (
  council: string,
  reference: string,
): ApiResponse<DprApplicationSubmissionApiResponse> => {
  const applicationApplication = generateDprApplication().application;
  applicationApplication.reference = reference;
  return {
    data: {
      application: applicationApplication,
      submission: generateApplicationSubmission,
    },
    status: {
      code: 200,
      message: "",
    },
  };
};

export const applicationSubmission = (
  council: string,
  reference: string,
): Promise<ApiResponse<DprApplicationSubmissionApiResponse | null>> => {
  return Promise.resolve(responseQuery(council, reference));
};
