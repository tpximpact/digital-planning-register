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

import { DprPlanningDataEntity } from "@/components/ApplicationConstraints";
import { getAppConfig } from "@/config";
import { ApiResponse } from "@/types";
import wkt from "wkt";

export const fetchEntityFromPlanningData = async (
  entity: number,
): Promise<ApiResponse<DprPlanningDataEntity["data"]>> => {
  try {
    const appConfig = getAppConfig();
    const url = `https://www.planning.data.gov.uk/entity/${entity}.json`;

    const revalidateConfig = appConfig.defaults.revalidate;
    const response = await fetch(url, {
      method: "GET",
      next: {
        revalidate: revalidateConfig,
      },
    });

    if (!response.ok) {
      // Handle non-2xx HTTP responses
      const errorData = await response.json();

      return {
        data: null,
        status: {
          code: response.status,
          message: response.statusText,
          detail: errorData,
        },
      };
    }

    const responseData = await response.json();

    const geometry = responseData.geometry;
    let geometryGeoJson: GeoJSON.Feature | undefined = undefined;

    if (geometry) {
      geometryGeoJson = {
        type: "Feature",
        geometry: wkt.parse(geometry), //or data.point
        properties: {
          name: responseData.name || undefined,
          dataset: responseData.dataset || undefined,
          entity: responseData.entity || undefined,
        },
      };
    }

    const data: DprPlanningDataEntity["data"] = {
      name: responseData.name || undefined,
      dataset: responseData.dataset || undefined,
      entity: responseData.entity || undefined,
      reference: responseData.reference || undefined,
      description: responseData.description || undefined,
      documentUrl: responseData["document-url"] || undefined,
      documentationUrl: responseData["documentation-url"] || undefined,
      entryDate: responseData["entry-date"] || undefined,
      startDate: responseData["start-date"] || undefined,
      endDate: responseData["end-date"] || undefined,
      designationDate: responseData["designation-date"] || undefined,
      geometry: geometryGeoJson,
    };

    return {
      data,
      status: {
        code: response.status,
        message: response.statusText,
      },
    };
  } catch (error) {
    const err = error as Error;
    return {
      data: null,
      status: {
        code: 500,
        message: "Internal server error",
        detail: err.message,
      },
    };
  }
};
