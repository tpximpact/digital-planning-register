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

// Types
import {
  ApiResponse,
  DprApplicationPostCommentApiResponse,
  DprCommentSubmission,
} from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";
import { CouncilDataSource } from "@/config/types";
import { getAppConfig } from "@/config";

/**
 * /api/docs?handler=ApiV1&method=postComment
 */
export async function postComment(
  source: CouncilDataSource | "appConfig" | "none",
  council: string,
  reference: string,
  apiData: DprCommentSubmission,
): Promise<ApiResponse<DprApplicationPostCommentApiResponse | null>> {
  if (!council || !reference || !apiData) {
    return apiReturnError("Council and reference are required");
  }

  if (source === "appConfig") {
    const appConfig = getAppConfig(council);
    source = appConfig.council?.dataSource ?? "none";
  }

  switch (source) {
    case "bops":
      return await BopsV2.postComment(council, reference, apiData);
    case "local":
      return await LocalV1.postComment(council, reference, apiData);
    default:
      return apiReturnError("Invalid source");
  }
}
