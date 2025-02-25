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
import { applicationSubmission } from "./applicationSubmission";

export const documentation: Documentation = {
  url: `/docs/json?handler=LocalV1&method=applicationSubmission`,
  file: `src/handlers/local/v1/applicationSubmission.ts`,
  description: "applicationSubmission",
  arguments: [],
  run: async () => {
    return await applicationSubmission("camden", "1234");
  },
  examples: [
    {
      url: `/docs/json?handler=LocalV1&method=applicationSubmission`,
      description: "applicationSubmission",
    },
  ],
};
