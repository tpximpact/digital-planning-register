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
import type { ApiResponse } from "@/types";
import { apiError } from "./api";

interface BackendRequest {
  council: string;
  /** Value for the x-handler header, tells the backend which handler to use */
  handler: string;
  /** Path below `/public`, including any query string */
  path: string;
  method?: "GET" | "POST";
  body?: unknown;
}

/**
 * Calls the DPR backend API. Always resolves to an ApiResponse envelope, it
 * never throws (network failures and bad responses become error envelopes).
 */
export async function backendRequest<T>({
  council,
  handler,
  path,
  method = "GET",
  body,
}: BackendRequest): Promise<ApiResponse<T | null>> {
  const baseUrl = process.env.DPR_BACKEND_URL;
  if (!baseUrl) {
    return apiError(500, "DPR_BACKEND_URL is not configured");
  }

  const init: RequestInit = {
    method,
    headers: {
      "x-client": council,
      "x-service": `DPR frontend ${handler} handler`,
      "x-handler": handler,
      ...(body !== undefined && { "content-type": "application/json" }),
    },
  };

  if (method === "GET") {
    init.next = { revalidate: getAppConfig(council).defaults.revalidate };
  } else {
    init.cache = "no-store";
    init.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseUrl}/public${path}`, init);

    // The backend answers with an ApiResponse envelope, successful or not
    const payload = (await response.json().catch(() => null)) as Partial<
      ApiResponse<T>
    > | null;

    if (!response.ok) {
      return apiError(
        response.status,
        payload?.status?.message || response.statusText || "Request failed",
        payload?.status?.detail,
      );
    }

    if (!payload) {
      return apiError(502, "The backend returned an invalid response");
    }

    return payload as ApiResponse<T | null>;
  } catch (error) {
    return apiError(
      500,
      "Failed to reach the backend",
      error instanceof Error ? error.message : String(error),
    );
  }
}
