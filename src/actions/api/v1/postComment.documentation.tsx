import { Documentation } from "@/types";
import { postComment } from "./postComment";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=postComment`,
  file: `src/actions/api/v1/postComment.ts`,
  description: "Post a comment to BOPS",
  arguments: ["source", "council", "applicationId"],
  run: async (args: [any, any, any, any]) => {
    return await postComment(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=ApiV1&method=postComment&applicationId=1&source=bops&council=camden&apiData=1`,
      description: "BOPS Submitting a comment to BOPS",
    },
    {
      url: `/docs/json?handler=ApiV1&method=postComment&applicationId=1&source=local&council=camden&apiData=1`,
      description: "Local Submitting a comment to BOPS",
    },
  ],
};
