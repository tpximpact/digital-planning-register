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
import { commentSearchFields } from "@/util/featureFlag";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const filterSearchParams = (
  searchParams: URLSearchParams,
  excludedKeys: string[],
): URLSearchParams => {
  return new URLSearchParams(
    Array.from(searchParams.entries()).filter(
      ([key]) => !excludedKeys.includes(key),
    ),
  );
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const council = searchParams.get("council");

  if (!council) {
    // console.error("Council parameter is missing");
    return redirect("/not-found");
  }

  const submitAction = searchParams.get("action");
  const filteredSearchParams =
    submitAction === "clear"
      ? filterSearchParams(searchParams, [...commentSearchFields, "action"])
      : searchParams;

  const appConfig = getAppConfig(council);
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

  // console.log("Redirecting to:", `${redirectPath}?${queryParams.toString()}`);
  redirect(`${redirectPath}?${queryParams.toString()}`);
}
