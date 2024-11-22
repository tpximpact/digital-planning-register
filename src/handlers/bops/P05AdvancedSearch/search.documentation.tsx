import { Documentation } from "@/types";
import { search } from "./search";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsP05&method=search`,
  file: `src/handlers/bops/P05AdvancedSearch/search.ts`,
  description: "getPlanningApplications",
  arguments: ["council", "page", "resultsPerPage", "searchQuery", "searchType"],
  run: async (args: [any, any, any, any, any]) => {
    const searchObj = {
      page: args[1],
      resultsPerPage: args[2],
      query: args[3],
      ...(args[4] !== undefined && { type: args[4] }),
    };
    return await search(args[0], searchObj);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsP05&method=search&page=1&resultsPerPage=10&council=camden`,
      description: "search page 1",
    },
    {
      url: `/docs/json?handler=BopsP05&method=search&page=3&resultsPerPage=10&council=camden`,
      description: "search page 3",
    },
    {
      url: `/docs/json?handler=BopsP05&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
      description: "search search w results",
    },
    {
      url: `/docs/json?handler=BopsP05&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease`,
      description: "search search no results",
    },
    {
      url: `/docs/json?handler=BopsP05&method=search&page=1&resultsPerPage=10&council=camden&searchType=dsn`,
      description: "search DSN's page 1",
    },
  ],
};
