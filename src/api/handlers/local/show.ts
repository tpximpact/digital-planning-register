import { ApiResponse, DprPublicApplicationDetails } from "@/types";

const localApiResponse: ApiResponse<DprPublicApplicationDetails | null> = {
  data: {
    application: { reference: "detail stuff" },
  },
  status: {
    code: 200,
    message: "Success",
  },
};

export const show: Promise<ApiResponse<DprPublicApplicationDetails | null>> =
  Promise.resolve(localApiResponse);
