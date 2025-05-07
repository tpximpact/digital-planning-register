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
import { validateSearchParams } from "@/lib/comments";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let queryParams = new URLSearchParams();
  const council = searchParams.get("council");

  if (council) {
    const appConfig = getAppConfig(council);
    const searchParamsObj = Object.fromEntries(searchParams.entries());
    const validSearchParams = validateSearchParams(appConfig, searchParamsObj);
    const validSearchParamsObject: Record<string, string> = Object.entries(
      validSearchParams,
    ).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value); // Convert all values to strings
        }
        return acc;
      },
      {} as Record<string, string>,
    );
    queryParams = new URLSearchParams(validSearchParamsObject);
  }

  const pathname = request.nextUrl.pathname;
  const redirectPath = pathname.replace("/search", "");

  redirect(`${redirectPath}?${queryParams.toString()}`);
}
