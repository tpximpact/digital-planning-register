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
"use server";

import { ApiResponse, DprSpecialistCommentsApiResponse } from "@/types";
import {
  generateNResults,
  generateComment,
} from "@mocks/dprApplicationFactory";

const response = (): ApiResponse<DprSpecialistCommentsApiResponse> => {
  const exampleComments = generateNResults(20, generateComment);
  const supportiveComments = exampleComments.filter(
    (comment) => comment.sentiment === "supportive",
  );
  const objectionComments = exampleComments.filter(
    (comment) => comment.sentiment === "objection",
  );
  const neutralComments = exampleComments.filter(
    (comment) => comment.sentiment === "neutral",
  );

  return {
    data: {
      comments: exampleComments,
      summary: {
        totalConsulted: exampleComments.length,
        totalComments: exampleComments.length,
        sentiment: {
          supportive: supportiveComments.length,
          objection: objectionComments.length,
          neutral: neutralComments.length,
        },
      },
    },
    status: {
      code: 200,
      message: "Success",
    },
    pagination: {
      resultsPerPage: 10,
      currentPage: 1,
      totalPages: Math.ceil(exampleComments.length / 10),
      totalItems: exampleComments.length,
    },
  };
};

export const specialistComments = (): Promise<
  ApiResponse<DprSpecialistCommentsApiResponse | null>
> => {
  return Promise.resolve(response());
};
