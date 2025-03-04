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
import { documents } from "./documents";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsV2&method=documents`,
  file: `src/handlers/bops/v2/documents.ts`,
  description: "documents",
  arguments: ["council", "reference"],
  run: async (args: [string, string]) => {
    return await documents(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsV2&method=documents&council=camden&reference=24-00129-HAPP`,
      description: "documents has documents",
    },
    {
      url: `/docs/json?handler=BopsV2&method=documents&council=camden&reference=doesnotexist`,
      description: "documents doesn't have documents",
    },
  ],
};
