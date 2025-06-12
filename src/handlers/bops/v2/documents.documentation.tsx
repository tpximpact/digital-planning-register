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

import { Documentation, SearchParamsDocuments } from "@/types";
import { documents } from "./documents";

export const documentation: Documentation = {
  url: `/admin/json?handler=BopsV2&method=documents`,
  file: `src/handlers/bops/v2/documents.ts`,
  description: "documents",
  arguments: ["council", "reference", "page", "resultsPerPage"],
  run: async (args: [string, string, number, number]) => {
    const searchObj: SearchParamsDocuments = {
      page: Number(args[2]),
      resultsPerPage: Number(args[3]),
    };
    return await documents(args[0], args[1], searchObj);
  },
  examples: [
    {
      url: `/admin/json?handler=BopsV2&method=documents&council=camden&reference=24-00129-HAPP`,
      description: "documents has documents",
    },
    {
      url: `/admin/json?handler=BopsV2&method=documents&council=camden&reference=doesnotexist`,
      description: "documents doesn't have documents",
    },
  ],
};
