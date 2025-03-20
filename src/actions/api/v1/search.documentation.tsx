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
import { Documentation, SearchParams } from "@/types";
import { search } from "./search";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=search`,
  file: `src/actions/api/v1/search.ts`,
  description: "getPlanningApplications",
  arguments: ["source", "council", "page", "resultsPerPage", "searchQuery"],
  run: async (args: [string, string, number, number, string]) => {
    const searchObj: SearchParams = {
      page: args[2],
      resultsPerPage: args[3],
      query: args[4],
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
