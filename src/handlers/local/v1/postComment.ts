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

import type {
  ApiResponse,
  DprApplicationPostCommentApiResponse,
} from "@/types";

/**
 * Pretends to post a comment. Set `simulateError` to true to test the error path.
 */
const simulateError = false;

export const postComment = (
  council: string,
  reference: string,
): Promise<ApiResponse<DprApplicationPostCommentApiResponse | null>> => {
  if (simulateError) {
    return Promise.resolve({
      data: null,
      status: {
        code: 400,
        message: "Bad Request",
        detail:
          "Validation failed: Name can't be blank, Response can't be blank, Summary tag can't be blank",
      },
    });
  }

  return Promise.resolve({
    data: { id: reference, message: "Response submitted" },
    status: { code: 200, message: "" },
  });
};
