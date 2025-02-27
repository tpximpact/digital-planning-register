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
  url: `/docs/json?handler=BopsV2&method=applicationSubmission`,
  file: `src/handlers/bops/v2/applicationSubmission.ts`,
  description: "applicationSubmission",
  arguments: ["council", "reference"],
  run: async (args: [any, any]) => {
    return await applicationSubmission(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsV2&method=applicationSubmission&council=camden&reference=24-00136-HAPP`,
      description: "applicationSubmission exists",
    },
    {
      url: `/docs/json?handler=BopsV2&method=applicationSubmission&council=camden&reference=nonexistent`,
      description: "applicationSubmission doesnt exist",
    },
  ],
};
