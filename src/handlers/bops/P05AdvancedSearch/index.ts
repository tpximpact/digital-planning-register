import { search } from "./search";

import { documentation as searchDocumentation } from "./search.documentation";

import { Documentation } from "@/types";
type HandlerFunction = (...args: any[]) => Promise<any>;

const handlers: Record<string, HandlerFunction> = {
  search,
};

const documentations: Record<string, Documentation> = {
  search: searchDocumentation,
};

export const BopsP05 = handlers;

export const BopsP05Documentation = documentations;
