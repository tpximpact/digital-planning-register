import { Documentation } from "@/types";
import { show } from "./show";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalV1&method=show&reference=24-00135-HAPP`,
  file: `src/handlers/local/v1/show.ts`,
  description: `Show the details for the specified application by reference number.`,
  validate: [
    {
      url: "/docs/json?handler=LocalV1&method=show&council=camden&reference=24-00135-HAPP",
      type: "application",
    },
    {
      url: "/docs/json?handler=LocalV1&method=show&council=camden&reference=24-00135-HAPP",
      type: "prototypeApplication",
    },
  ],
  arguments: ["council", "reference"],
  run: async (args: [any, any]) => {
    return await show(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=LocalV1&method=show&reference=TEST-C0MNT-F10W`,
      description: "Show application with in_assessment status",
    },
  ],
};
