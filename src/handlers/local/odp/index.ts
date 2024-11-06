import * as examples from "./examples";
import * as dprOdpPrototypeApplication from "./dprOdpPrototypeApplication";

import * as examplesDocumentation from "./examples.documentation";
import * as dprOdpPrototypeApplicationDocumentation from "./dprOdpPrototypeApplication.documentation";

import { Documentation } from "@/types";

// Define LocalOdp with specific types for better type safety
export const LocalOdp: Record<string, any> = {
  examples: examples.examples,
  dprOdpPrototypeApplication:
    dprOdpPrototypeApplication.dprOdpPrototypeApplication,
};

// Define LocalOdpDocumentation with specific types for better type safety
export const LocalOdpDocumentation: {
  [key: string]: Documentation;
} = {
  examples: examplesDocumentation.documentation,
  dprOdpPrototypeApplication:
    dprOdpPrototypeApplicationDocumentation.documentation,
};
