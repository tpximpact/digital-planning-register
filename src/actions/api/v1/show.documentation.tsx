import { Documentation } from "@/types";
import { show } from "./show";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=show`,
  file: `src/actions/api/v1/show.ts`,
  description: "show",
  arguments: ["source", "council", "reference"],
  run: async (args: [any, any, any]) => {
    return await show(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=ApiV1&method=show&source=bops&council=camden&reference=24-00136-HAPP`,
      description: "show exists",
    },
    {
      url: `/docs/json?handler=ApiV1&method=show&source=bops&council=camden&reference=doesnotexist`,
      description: "show doesn't exist",
    },
  ],
};
