import * as search from "./search";

import * as searchDocumentation from "./search.documentation";

import { Documentation } from "@/types";

// Define ApiP05 with specific types for better type safety
export const ApiP05: Record<string, any> = {
  search: search.search,
};

// Define ApiP05Documentation with specific types for better type safety
export const ApiP05Documentation: {
  [key: string]: Documentation;
} = {
  search: searchDocumentation.documentation,
};
