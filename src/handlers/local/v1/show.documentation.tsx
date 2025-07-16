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
  url: `/admin/json?handler=LocalV1&method=show&reference=24-00135-HAPP`,
  file: `src/handlers/local/v1/show.ts`,
  description: `Show the details for the specified application by reference number.`,
  validate: [
    {
      url: "/admin/json?handler=LocalV1&method=show&council=camden&reference=24-00135-HAPP",
      type: "postSubmissionApplication",
    },
    {
      url: "/admin/json?handler=LocalV1&method=show&council=camden&reference=24-00135-HAPP",
      type: "postSubmissionApplication",
    },
  ],
  arguments: ["council", "reference"],
  run: async (args: [string, string]) => {
    return await show(...args);
  },
  examples: [
    {
      url: `/admin/json?handler=LocalV1&method=show&reference=TEST-C0MNT-F10W`,
      description: "Show application with in_assessment status",
    },
  ],
};
