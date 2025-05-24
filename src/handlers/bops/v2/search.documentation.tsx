/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { Documentation, SearchParamsApplication } from "@/types";
import { search } from "./search";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsV2&method=search`,
  file: `src/handlers/bops/v2/search.ts`,
  description: "getPlanningApplications",
  arguments: ["council", "page", "resultsPerPage", "searchQuery"],
  run: async (args: [string, number, number, string]) => {
    const searchObj: SearchParamsApplication = {
      page: args[1],
      resultsPerPage: args[2],
      query: args[3],
      type: "simple",
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
