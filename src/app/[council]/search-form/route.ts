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
import { validateSearchParams } from "@/lib/planningApplication/search";
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
  const applicationSearchFields =
    appConfig.features?.applicationSearchFields ?? [];
  const submitAction = searchParams.get("action");
  const filteredSearchParams =
    submitAction === "clear"
      ? filterSearchParams(searchParams, [...applicationSearchFields, "action"])
      : searchParams;

  const searchParamsObj: Record<string, string> = {};
  for (const [key, value] of Array.from(filteredSearchParams.entries())) {
    if (searchParamsObj[key]) {
      // Split, add, dedupe, and join
      const values = searchParamsObj[key].split(",");
      if (!values.includes(value)) {
        values.push(value);
      }
      searchParamsObj[key] = values.join(",");
    } else {
      searchParamsObj[key] = value;
    }
  }

  const validSearchParams = validateSearchParams(appConfig, searchParamsObj);

  // we're temporarily removing the resultsPerPage from the search params because the design doesn't account for it
  // removing it 'properly' would require a lot of work and it's likely something that will be added in the future
  // const validSearchParamsObject = Object.fromEntries(
  //   Object.entries(validSearchParams).filter(
  //     ([_, value]) => value !== undefined,
  //   ),
  // );
  const validSearchParamsObjectMinusResultsPerPage = Object.fromEntries(
    Object.entries(validSearchParams).filter(
      ([key, value]) => value !== undefined && key !== "resultsPerPage",
    ),
  );

  const queryParams = new URLSearchParams(
    validSearchParamsObjectMinusResultsPerPage,
  );
  const pathname = request.nextUrl.pathname;
  const redirectPath = pathname.replace("/search-form", "");

  redirect(`${redirectPath}?${queryParams.toString()}`);
}
