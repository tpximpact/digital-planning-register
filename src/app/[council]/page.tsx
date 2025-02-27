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

import React from "react";
import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { ContentError } from "@/components/ContentError";
import { PageMain } from "@/components/PageMain";
import { PageSearch } from "@/components/PageSearch";

interface HomeProps {
  params: {
    council: string;
  };
  searchParams?: SearchParams;
}

async function fetchData({
  params,
  searchParams,
}: HomeProps): Promise<ApiResponse<DprSearchApiResponse | null>> {
  const { council } = params;
  const appConfig = getAppConfig(council);

  const response = await ApiV1.search(
    appConfig.council?.dataSource ?? "none",
    council,
    {
      ...searchParams,
      page: searchParams?.page ?? 1,
      resultsPerPage: appConfig.defaults.resultsPerPage ?? 10,
    },
  );

  return response;
}

export async function generateMetadata({ params, searchParams }: HomeProps) {
  const response = await fetchData({ params, searchParams });

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
}

export default async function PlanningApplicationSearch({
  params,
  searchParams,
}: HomeProps) {
  const { council } = params;
  const appConfig = getAppConfig(council);
  const response = await fetchData({ params, searchParams });

  if (
    !response ||
    response?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  return (
    <PageSearch
      appConfig={appConfig}
      applications={response.data}
      pagination={response.pagination}
      params={params}
      searchParams={searchParams}
    />
  );
}
