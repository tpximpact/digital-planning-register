import { Documentation } from "@/types";
import { applicationSubmission } from "./applicationSubmission";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalV1&method=applicationSubmission`,
  file: `src/handlers/local/v1/applicationSubmission.ts`,
  description: "applicationSubmission",
  arguments: [],
  run: async () => {
    return await applicationSubmission("camden", "1234");
  },
  examples: [
    {
      url: `/docs/json?handler=LocalV1&method=applicationSubmission`,
      description: "applicationSubmission",
    },
  ],
};
