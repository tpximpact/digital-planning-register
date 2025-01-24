import { Documentation } from "@/types";
import { show } from "./show";

export const documentation: Documentation = {
  url: `/docs/json?handler=OpenData&method=show`,
  file: `src/handlers/bops/v2/show.ts`,
  source: [
    "https://camden.bops-staging.services/api/v2/public/planning_applications/applicationid",
  ],
  description: "show",
  arguments: ["council", "reference"],
  run: async (args: [any, any]) => {
    return await show(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=OpenData&method=show&council=src/handlers/opendata/api/search.documentation.tsx&reference=24-00136-HAPP`,
      description: "show exists",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00136-HAPP",
      ],
    },
    {
      url: `/docs/json?handler=OpenData&method=show&council=src/handlers/opendata/api/search.documentation.tsx&reference=doesnotexist`,
      description: "show doesn't exist",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/doesnotexist",
      ],
    },
  ],
};
