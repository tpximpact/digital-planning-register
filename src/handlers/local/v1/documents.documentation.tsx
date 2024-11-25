import { Documentation } from "@/types";
import { documents } from "./documents";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalV1&method=documents`,
  file: `src/handlers/local/v1/documents.ts`,
  description: "documents",
  arguments: [],
  run: async () => {
    return await documents("camden", "1234");
  },
  examples: [
    {
      url: `/docs/json?handler=LocalV1&method=documents`,
      description: "documents",
    },
  ],
};
