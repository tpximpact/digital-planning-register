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

import { Documentation, DprCommentSubmission } from "@/types";
import { postComment } from "./postComment";

export const documentation: Documentation = {
  url: `/admin/json?handler=BopsV2&method=postComment`,
  file: `src/handlers/bops/v2/postComment.ts`,
  description: "Post a comment to BOPS",
  arguments: ["council", "applicationId"],
  run: async (args: [string, string, DprCommentSubmission]) => {
    return await postComment(...args);
  },
  examples: [
    {
      url: `/admin/json?handler=BopsV2&method=postComment&applicationId=1&council=camden&apiData=1`,
      description: "Submitting a comment to BOPS",
    },
  ],
};
