import { Documentation } from "@/types";
import { search } from "./search";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=search`,
  file: `src/actions/api/v1/search.ts`,
  description: "getPlanningApplications",
  arguments: ["source", "council", "page", "resultsPerPage", "searchQuery"],
  run: async (args: [any, any, any, any, any]) => {
    const searchObj = {
      page: args[2],
      resultsPerPage: args[3],
      query: args[4],
      type: "dsn",
    };
    return await search(args[0], args[1], searchObj);
  },
  examples: [
    {
      url: `/docs/json?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=bops&council=camden`,
      description: "search page 1",
    },
    {
      url: `/docs/json?handler=ApiV1&method=search&page=3&resultsPerPage=10&source=bops&council=camden`,
      description: "search page 3",
    },
    {
      url: `/docs/json?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=bops&council=camden&searchQuery=HAPP`,
      description: "search search w results",
    },
    {
      url: `/docs/json?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=bops&council=camden&searchQuery=noresultsplease`,
      description: "search search no results",
    },
  ],
};
