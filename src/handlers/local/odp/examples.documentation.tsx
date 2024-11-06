import { Documentation } from "@/types";
import { examples } from "./examples";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalOdp&method=examples&type=application&filePath=planningPermission/fullHouseholder`,
  file: `src/handlers/local/odp/examples.ts`,
  description: "Returns example JSON documents from the ODP repository",
  arguments: ["type", "filePath"],
  run: async (args: [any, any]) => {
    return await examples(...args);
  },
  validate: [
    {
      url: `/docs/json?handler=LocalV1&method=examples&type=application&filePath=planningPermission/fullHouseholder`,
      type: "application",
    },
    {
      url: `/docs/json?handler=LocalV1&method=examples&type=prototypeApplication&filePath=planningPermission/fullHouseholder`,
      type: "prototypeApplication",
    },
  ],
  examples: [
    {
      url: `/docs/json?handler=LocalV1&method=examples&type=application&filePath=planningPermission/fullHouseholder`,
      description: "examples",
    },
  ],
};
