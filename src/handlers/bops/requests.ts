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

import { getAppConfig } from "@/config";

export async function handleBopsGetRequest<T>(
  council: string,
  url: string,
  v1?: boolean,
): Promise<T> {
  v1 = v1 ?? false;

  // COUNCIL_BOPS_API_KEY=
  const apiKey = `${council.toUpperCase()}_BOPS_API_KEY`;

  // COUNCIL_BOPS_API_URL=
  // COUNCIL_BOPS_API_URL_V1=
  const councilApi = `${council.toUpperCase()}_BOPS_API_URL${v1 ? "_V1" : ""}`;

  if (!process.env[councilApi]) {
    return {
      data: null,
      status: {
        code: 404,
        message: "Couldn't find requested endpoint",
        detail: "Council not registered",
      },
    } as T;
  } else {
    try {
      const config = getAppConfig(council);
      const revalidateConfig = config.defaults.revalidate;
      const response = await fetch(`${process.env[councilApi]}${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env[apiKey]}`,
        },
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
            detail: errorData?.error?.detail
              ? errorData.error.detail
              : errorData,
          },
        } as T;
      }

      const data = await response.json();
      return {
        data,
        status: {
          code: response.status,
          message: response.statusText,
        },
      } as T;
    } catch (error) {
      const err = error as Error;
      return {
        data: null,
        status: {
          code: 500,
          message: "Internal server error",
          detail: err.message,
        },
      } as T;
    }
  }
}
export async function handleBopsPostRequest<T>(
  council: string,
  url: string,
  apiData: object,
  v1?: boolean,
): Promise<T> {
  v1 = v1 ?? false;

  // COUNCIL_BOPS_API_KEY=
  const apiKey = `${council.toUpperCase()}_BOPS_API_KEY`;

  // COUNCIL_BOPS_API_URL=
  // COUNCIL_BOPS_API_URL_V1=
  const councilApi = `${council.toUpperCase()}_BOPS_API_URL${v1 ? "_V1" : ""}`;

  if (!process.env[councilApi]) {
    return {
      data: null,
      status: {
        code: 404,
        message: "Couldn't find requested endpoint",
        detail: "Council not registered",
      },
    } as T;
  } else {
    try {
      const response = await fetch(`${process.env[councilApi]}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env[apiKey]}`,
        },
        body: JSON.stringify(apiData),
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
        } as T;
      }

      const data = await response.json();
      return {
        data,
        status: {
          code: response.status,
          message: response.statusText,
        },
      } as T;
    } catch (error) {
      const err = error as Error;
      return {
        data: null,
        status: {
          code: 500,
          message: "Internal server error",
          detail: err.message,
        },
      } as T;
    }
  }
}
