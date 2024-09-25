import { ApiResponse, DprPublicApplicationDocuments } from "@/types";

const localApiResponse: ApiResponse<DprPublicApplicationDocuments | null> = {
  data: {
    application: { reference: "document stuff" },
  },
  status: {
    code: 200,
    message: "Success",
  },
};

export const documents: Promise<
  ApiResponse<DprPublicApplicationDocuments | null>
> = Promise.resolve(localApiResponse);
