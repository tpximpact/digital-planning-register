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

import { Documentation, SearchParamsComments } from "@/types";
import { specialistComments } from "./specialistComments";
import { CouncilDataSourceExtended } from "@/config/types";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=specialistComments`,
  file: `src/actions/api/v1/specialistComments.ts`,
  description: "[specialistComments]",
  arguments: [
    "source",
    "council",
    "reference",
    "page",
    "resultsPerPage",
    "searchQuery",
  ],
  run: async (
    args: [CouncilDataSourceExtended, string, string, SearchParamsComments],
  ) => {
    return await specialistComments(...args);
  },
  examples: [
    {
      // this is using the southwark council bops data from the comments endpoint - will need to be updated when bops branch is merged
      // uncomment below when bops branch is merged and remove the southwark examples
      url: `/docs/json?handler=ApiV1&method=specialistComments&source=bops&council=southwark&reference=25-00292-HAPP`,
      description: "specialistComments exists",
    },
    {
      url: `/docs/json?handler=ApiV1&method=specialistComments&source=bops&council=southwark&reference=doesnotexist`,
      description: "specialistComments doesn't exist",
    },
    // {
    //   url: `/docs/json?handler=ApiV1&method=specialistComments&source=bops&council=camden&reference=24-00129-HAPP`,
    //   description: "specialistComments exists",
    // },
    // {
    //   url: `/docs/json?handler=ApiV1&method=specialistComments&source=bops&council=camden&reference=doesnotexist`,
    //   description: "specialistComments doesn't exist",
    // },
  ],
};
