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
import { publicComments } from "./publicComments";

export const documentation: Documentation = {
  url: `/docs/json?handler=ApiV1&method=publicComments`,
  file: `src/actions/api/v1/publicComments.ts`,
  description: "[publicComments]",
  arguments: [
    "source",
    "council",
    "reference",
    "page",
    "resultsPerPage",
    "searchQuery",
  ],
  run: async (args: [string, string, string]) => {
    return await publicComments(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=ApiV1&method=publicComments&source=bops&council=southwark&reference=25-00292-HAPP`,
      description: "publicComments exists",
    },
    {
      url: `/docs/json?handler=ApiV1&method=publicComments&source=bops&council=southwark&reference=doesnotexist`,
      description: "publicComments doesn't exist",
    },
    // {
    //   url: `/docs/json?handler=ApiV1&method=publicComments&source=bops&council=camden&reference=24-00129-HAPP`,
    //   description: "publicComments exists",
    // },
    // {
    //   url: `/docs/json?handler=ApiV1&method=publicComments&source=bops&council=camden&reference=doesnotexist`,
    //   description: "publicComments doesn't exist",
    // },
  ],
};
