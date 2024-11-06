import * as search from "./search";

import * as searchDocumentation from "./search.documentation";

import { Documentation } from "@/types";

// Define BopsP05 with specific types for better type safety
export const BopsP05: Record<string, any> = {
  search: search.search,
};

// Define BopsP05Documentation with specific types for better type safety
export const BopsP05Documentation: {
  [key: string]: Documentation;
} = {
  search: searchDocumentation.documentation,
};
