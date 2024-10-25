"use server";

import { ApiResponse, DprApiApplicationSubmissionResponse } from "@/types";
import { generateDprApplication } from "@mocks/dprApplicationFactory";
import { generateApplicationSubmission } from "@mocks/odpApplicationSubmission";

const response: ApiResponse<DprApiApplicationSubmissionResponse | null> = {
  data: {
    application: generateDprApplication().application,
    submission: generateApplicationSubmission,
  },
  status: {
    code: 200,
    message: "",
  },
};

export const applicationSubmission = (): Promise<
  ApiResponse<DprApiApplicationSubmissionResponse | null>
> => {
  return Promise.resolve(response);
};
