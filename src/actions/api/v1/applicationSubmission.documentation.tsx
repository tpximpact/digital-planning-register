import { Documentation } from "@/types";
import { applicationSubmission } from "./applicationSubmission";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=applicationSubmission`,
  file: `src/actions/api/v1/applicationSubmission.ts`,
  description: "applicationSubmission",
  arguments: ["source", "council", "reference"],
  run: async (args: [any, any, any]) => {
    return await applicationSubmission(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=ApiV1&method=applicationSubmission&source=bops&council=camden&reference=24-00136-HAPP`,
      description: "applicationSubmission exists",
    },
    {
      url: `/docs/json?handler=ApiV1&method=applicationSubmission&source=bops&council=camden&reference=nonexistent`,
      description: "applicationSubmission doesnt exist",
    },
  ],
};
