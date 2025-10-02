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

import { Documentation, SearchParamsSpecialistComments } from "@/types";
import { specialist } from "./specialist";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsV2&method=specialist`,
  file: `src/handlers/bops/v2/specialist.ts`,
  description: "specialist",
  arguments: ["council", "reference", "specialistId", "searchParams"],
  run: async (
    args: [string, string, string, SearchParamsSpecialistComments],
  ) => {
    return await specialist(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsV2&method=specialist&council=southwark&reference=25-00292-HAPP`,
      description: "specialist has specialist",
    },
    {
      url: `/docs/json?handler=BopsV2&method=specialist&council=southwark&reference=doesnotexist`,
      description: "specialist doesn't have specialist",
    },
    // {
    //   url: `/docs/json?handler=BopsV2&method=specialist&council=camden&reference=24-00129-HAPP`,
    //   description: "specialist has specialist",
    // },
    // {
    //   url: `/docs/json?handler=BopsV2&method=specialist&council=camden&reference=doesnotexist`,
    //   description: "specialist doesn't have specialist",
    // },
  ],
};
