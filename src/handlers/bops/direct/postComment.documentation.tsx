import { Documentation } from "@/types";
import { postComment } from "./postComment";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsV2&method=postComment`,
  description: "Post a comment to BOPS",
  arguments: ["council", "applicationId", "apiData"],
  run: async (args: [any, any, any]) => {
    return await postComment(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsV2&method=postComment&applicationId=1&council=camden&apiData=1`,
      description: "Submitting a comment to BOPS",
    },
  ],
};
