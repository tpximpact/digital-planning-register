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

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalV1&method=specialistComments`,
  file: `src/handlers/local/v1/specialistComments.ts`,
  description: "specialistComments",
  arguments: [
    "source",
    "council",
    "reference",
    "page",
    "resultsPerPage",
    "searchQuery",
  ],
  run: async (args: [string, string, SearchParamsComments]) => {
    return await specialistComments(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=LocalV1&method=specialistComments`,
      description: "specialistComments",
    },
  ],
};
