import { Documentation } from "@/types";
import { postComment } from "./postComment";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalV1&method=postComment`,
  file: `src/handlers/local/v1/postComment.ts`,
  description: "postComment",
  arguments: [],
  run: async () => {
    return await postComment("camden", 1234, {});
  },
};
