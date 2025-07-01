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
import { filterSearchParams } from "@/lib/search";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const council = searchParams.get("council");

  // council parameter is missing
  if (!council) {
    return redirect("/not-found");
  }

  const appConfig = getAppConfig(council);
  const commentSearchFields = appConfig.features?.commentSearchFields ?? [];
  const submitAction = searchParams.get("action");
  const filteredSearchParams =
    submitAction === "clear"
      ? filterSearchParams(searchParams, [...commentSearchFields, "action"])
      : searchParams;

  const searchParamsObj = Object.fromEntries(filteredSearchParams.entries());
  const validSearchParams = validateSearchParams(appConfig, searchParamsObj);

  const validSearchParamsObject = Object.fromEntries(
    Object.entries(validSearchParams).filter(
      ([_, value]) => value !== undefined,
    ),
  );

  const queryParams = new URLSearchParams(validSearchParamsObject);
  const pathname = request.nextUrl.pathname;
  const redirectPath = pathname.replace("/search", "");

  redirect(`${redirectPath}?${queryParams.toString()}`);
}
