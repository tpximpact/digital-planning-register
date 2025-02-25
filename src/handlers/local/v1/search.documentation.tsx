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
  ],
};
