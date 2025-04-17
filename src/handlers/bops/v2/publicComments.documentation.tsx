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
import { publicComments } from "./publicComments";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsV2&method=publicComments`,
  file: `src/handlers/bops/v2/publicComments.ts`,
  description: "publicComments",
  arguments: ["council", "reference", "searchParams"],
  run: async (args: [string, string, SearchParamsComments]) => {
    return await publicComments(...args);
  },
  examples: [
    // this is using the southwark council bops data from the comments endpoint - will need to be updated when bops branch is merged
    // uncomment below when bops branch is merged and remove the southwark examples
    {
      url: `/docs/json?handler=BopsV2&method=publicComments&council=southwark&reference=25-00292-HAPP`,
      description: "publicComments has publicComments",
    },
    {
      url: `/docs/json?handler=BopsV2&method=publicComments&council=southwark&reference=doesnotexist`,
      description: "publicComments doesn't have publicComments",
    },
    // {
    //   url: `/docs/json?handler=BopsV2&method=publicComments&council=camden&reference=24-00129-HAPP`,
    //   description: "publicComments has publicComments",
    // },
    // {
    //   url: `/docs/json?handler=BopsV2&method=publicComments&council=camden&reference=doesnotexist`,
    //   description: "publicComments doesn't have publicComments",
    // },
  ],
};
