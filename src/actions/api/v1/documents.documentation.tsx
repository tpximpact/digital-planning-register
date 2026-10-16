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

import { Documentation, UnknownSearchParams } from "@/types";
import { documents } from "./documents";
import { CouncilDataSourceExtended } from "@/config/types";
import { validateSearchParams } from "@/lib/documents";
import { getAppConfig } from "@/config";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=documents`,
  file: `src/actions/api/v1/documents.ts`,
  description: "documents",
  arguments: ["source", "council", "reference", "page", "resultsPerPage"],
  run: async (
    args: [CouncilDataSourceExtended, string, string, string, string],
  ) => {
    const searchObj: UnknownSearchParams = {
      page: args[3],
      resultsPerPage: args[4],
    };
    const appConfig = getAppConfig(args[1]);
    const validSearchParams = validateSearchParams(appConfig, searchObj);
    return await documents(args[0], args[1], args[2], validSearchParams);
  },
  examples: [
    {
      url: `/docs/json?handler=ApiV1&method=documents&source=bops&council=camden&reference=24-00129-HAPP&page=1&resultsPerPage=10`,
      description: "documents has documents",
    },
    {
      url: `/docs/json?handler=ApiV1&method=documents&source=bops&council=camden&reference=doesnotexist&page=1&resultsPerPage=10`,
      description: "documents doesn't have documents",
    },
  ],
};
