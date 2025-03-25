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
  url: `/docs/json?handler=ApiV1&method=postComment`,
  file: `src/actions/api/v1/postComment.ts`,
  description: "Post a comment to BOPS",
  arguments: ["source", "council", "applicationId"],
  run: async (args: [string, string, string, DprCommentSubmission]) => {
    return await postComment(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=ApiV1&method=postComment&applicationId=1&source=bops&council=camden&apiData=1`,
      description: "BOPS Submitting a comment to BOPS",
    },
    {
      url: `/docs/json?handler=ApiV1&method=postComment&applicationId=1&source=local&council=camden&apiData=1`,
      description: "Local Submitting a comment to BOPS",
    },
  ],
};
