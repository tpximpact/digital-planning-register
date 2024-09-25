import { ApiResponse, DprApplicationSubmission } from "@/types";

const localApiResponse: ApiResponse<DprApplicationSubmission | null> = {
  data: {
    application: { reference: "applicationSubmission stuff" },
  },
  status: {
    code: 200,
    message: "Success",
  },
};

export const applicationSubmission: Promise<
  ApiResponse<DprApplicationSubmission | null>
> = Promise.resolve(localApiResponse);
