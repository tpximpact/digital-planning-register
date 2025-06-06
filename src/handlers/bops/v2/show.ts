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

import { ApiResponse, DprApplication, DprShowApiResponse } from "@/types";
import { BopsV2PublicPlanningApplicationDetail } from "@/handlers/bops/types";
import { handleBopsGetRequest } from "../requests";
import { convertBopsToDpr } from "../converters/planningApplication";
import {
  convertToDprApplication,
  isDprApplication,
} from "@/lib/planningApplication/converter";

/**
 * Get the details for an application
 * https://camden.bops-staging.services/api/v2/public/planning_applications/23-00122-HAPP
 * @param council
 * @param reference
 * @returns
 */
export async function show(
  council: string,
  reference: string,
): Promise<ApiResponse<DprShowApiResponse | null>> {
  try {
    const request = await handleBopsGetRequest<
      ApiResponse<BopsV2PublicPlanningApplicationDetail | null>
    >(council, `public/planning_applications/${reference}`);

    if (!request?.data) {
      return { ...request, data: null };
    }
    const convertedData = convertBopsToDpr(request.data, council);

    const convertedApplication: DprApplication = isDprApplication(convertedData)
      ? convertedData
      : convertToDprApplication(convertedData);

    return { ...request, data: convertedApplication };
  } catch (error) {
    console.error("Error fetching or converting application data:", error);
    let detail = "Unknown error";
    if (error instanceof Error) {
      detail = error.message;
    }
    return {
      data: null,
      status: {
        code: 500,
        message: "Internal server error",
        detail,
      },
    };
  }
}
