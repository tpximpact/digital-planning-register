import { Documentation } from "@/types";
import { search } from "./search";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalV1&method=search`,
  file: `src/handlers/local/v1/search.ts`,
  description: "search",
  arguments: ["page", "resultsPerPage", "council", "searchQuery", "searchType"],
  run: async (args: any) => {
    const searchObj = {
      page: args[0],
      resultsPerPage: args[1],
      query: args[3],
      type: args[4],
    };
    return await search(searchObj);
  },
  examples: [
    {
      url: `/docs/json?handler=LocalV1&method=search&page=1&resultsPerPage=10&council=camden`,
      description: "search page 1",
    },
    {
      url: `/docs/json?handler=LocalV1&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
      description: "search search w results",
    },
    {
      url: `/docs/json?handler=LocalV1&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease&searchType=dsn`,
      description: "show DSN's",
    },
  ],
};
