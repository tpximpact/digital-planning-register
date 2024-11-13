import { Documentation } from "@/types";
import { search } from "./search";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsV2&method=search`,
  file: `src/handlers/bops/v2/search.ts`,
  description: "getPlanningApplications",
  arguments: ["council", "page", "resultsPerPage", "searchQuery"],
  run: async (args: [any, any, any, any]) => {
    const searchObj = {
      page: args[1],
      resultsPerPage: args[2],
      query: args[3],
      type: "dsn",
    };
    return await search(args[0], searchObj);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsV2&method=search&page=1&resultsPerPage=10&council=camden`,
      description: "search page 1",
    },
    {
      url: `/docs/json?handler=BopsV2&method=search&page=3&resultsPerPage=10&council=camden`,
      description: "search page 3",
    },
    {
      url: `/docs/json?handler=BopsV2&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
      description: "search search w results",
    },
    {
      url: `/docs/json?handler=BopsV2&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease`,
      description: "search search no results",
    },
  ],
};
