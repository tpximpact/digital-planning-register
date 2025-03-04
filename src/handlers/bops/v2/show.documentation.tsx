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
import { show } from "./show";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsV2&method=show`,
  file: `src/handlers/bops/v2/show.ts`,
  source: [
    "https://camden.bops-staging.services/api/v2/public/planning_applications/applicationid",
  ],
  description: "show",
  arguments: ["council", "reference"],
  run: async (args: [string, string]) => {
    return await show(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsV2&method=show&council=camden&reference=24-00136-HAPP`,
      description: "show exists",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00136-HAPP",
      ],
    },
    {
      url: `/docs/json?handler=BopsV2&method=show&council=camden&reference=doesnotexist`,
      description: "show doesn't exist",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/doesnotexist",
      ],
    },
  ],
};
