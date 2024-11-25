import { Documentation } from "@/types";
import { documents } from "./documents";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=documents`,
  file: `src/actions/api/v1/documents.ts`,
  description: "documents",
  arguments: ["source", "council", "reference"],
  run: async (args: [any, any, any]) => {
    return await documents(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=ApiV1&method=documents&source=bops&council=camden&reference=24-00129-HAPP`,
      description: "documents has documents",
    },
    {
      url: `/docs/json?handler=ApiV1&method=documents&source=bops&council=camden&reference=doesnotexist`,
      description: "documents doesn't have documents",
    },
  ],
};
