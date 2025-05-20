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
import { ApiResponse, DprShowApiResponse } from "@/types";

// handlers
import { BopsV2 } from "@/handlers/bops";
import { LocalV1 } from "@/handlers/local";
import { apiReturnError } from "@/handlers/lib";
import { getAppConfig } from "@/config";
import { CouncilDataSource } from "@/config/types";

/**
 * /api/docs?handler=ApiV1&method=show
 */
export async function show(
  source: CouncilDataSource | "appConfig" | "none",
  council: string,
  reference: string,
): Promise<ApiResponse<DprShowApiResponse | null>> {
  if (!council || !reference) {
    return apiReturnError("Council and reference are required");
  }

  if (source === "appConfig") {
    const appConfig = getAppConfig(council);
    source = appConfig.council?.dataSource ?? "none";
  }

  switch (source) {
    case "bops":
      return await BopsV2.show(council, reference);
    case "local":
      return await LocalV1.show(council, reference);
    default:
      return apiReturnError("Invalid source");
  }
}
