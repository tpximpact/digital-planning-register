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

import { Metadata } from "next";
import {
  ApiResponse,
  DprSpecialistApiResponse,
  SearchParamsSpecialistComments,
  UnknownSearchParams,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageSpecialistComments } from "@/components/PageSpecialistComments";
import { validateSearchParams } from "@/lib/specialistComments";

interface PlanningApplicationDetailsCommentsProps {
  params: {
    council: string;
    reference: string;
    specialistId: number;
  };
  searchParams?: UnknownSearchParams;
}

interface PlanningApplicationDetailsCommentsFetchProps
  extends Omit<PlanningApplicationDetailsCommentsProps, "searchParams"> {
  searchParams: SearchParamsSpecialistComments;
}

async function fetchSpecialistCommentData({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsFetchProps): Promise<
  ApiResponse<DprSpecialistApiResponse>
> {
  const { council, reference, specialistId } = params;
  const appConfig = getAppConfig(council);
  const dataSource = appConfig.council?.dataSource ?? "none";

  // fetch (filtered) comments
  const response = await ApiV1.specialist(
    dataSource,
    council,
    reference,
    specialistId,
    {
      ...searchParams,
      page: searchParams?.page ?? 1,
      resultsPerPage: appConfig.defaults.resultsPerPage ?? 10,
    },
  );

  return response;
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsCommentsProps): Promise<Metadata | undefined> {
  const { council, reference } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";

  return {
    title: `Specialist Comments`,
    description: `All specialist comments for ${councilName} Council planning application ${reference}`,
  };
}

export default async function PlanningApplicationDetailsComments({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsProps) {
  const { council } = params;
  const appConfig = getAppConfig(council);
  const validSearchParams = validateSearchParams(appConfig, searchParams);

  const specialistResponse = await fetchSpecialistCommentData({
    params,
    searchParams: validSearchParams,
  });

  if (specialistResponse.status.code !== 200 || !specialistResponse.data) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  return (
    <PageSpecialistComments
      params={params}
      appConfig={appConfig}
      specialist={specialistResponse.data}
      pagination={specialistResponse.pagination}
      searchParams={validSearchParams}
    />
  );
}
