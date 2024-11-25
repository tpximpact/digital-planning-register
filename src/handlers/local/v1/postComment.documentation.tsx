import { Documentation } from "@/types";
import { postComment } from "./postComment";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalV1&method=postComment`,
  file: `src/handlers/local/v1/postComment.ts`,
  description: "postComment",
  arguments: ["council", "applicationId"],
  run: async (args: [any, any, any]) => {
    return await postComment(...args);
  },
};
