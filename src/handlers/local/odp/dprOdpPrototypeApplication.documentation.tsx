import { Documentation } from "@/types";
import { dprOdpPrototypeApplication } from "./dprOdpPrototypeApplication";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalOdp&method=dprOdpPrototypeApplication&council=camden&reference=24-00136-HAPP`,
  file: `src/handlers/local/odp/dprOdpPrototypeApplication.ts`,
  description: "Returns ODP data in a DPR compatible format",
  arguments: ["council", "reference"],
  run: async (args: [any, any]) => {
    return await dprOdpPrototypeApplication(...args);
  },
  validate: [
    {
      url: `/docs/json?handler=LocalOdp&method=dprOdpPrototypeApplication&council=camden&reference=24-00136-HAPP`,
      type: "application",
    },
  ],
  examples: [
    {
      url: `/docs/json?handler=LocalOdp&method=dprOdpPrototypeApplication&council=camden&reference=24-00136-HAPP`,
      description: "Show application",
    },
  ],
};
