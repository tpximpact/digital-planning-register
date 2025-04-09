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
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";
import {
  ApiResponse,
  DprPublicCommentsApiResponse,
  SearchParams,
} from "@/types";

/**
 * /api/docs?handler=ApiV1&method=publicComments
 */
export async function publicComments(
  source: string,
  council: string,
  reference: string,
  search: SearchParams,
): Promise<ApiResponse<DprPublicCommentsApiResponse | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  switch (source) {
    case "bops":
      return await BopsV2.publicComments(council, reference, search);
    case "local":
      return await LocalV1.publicComments(council, reference, search);
    default:
      return apiReturnError("Invalid source");
  }
}
