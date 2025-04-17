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
import { ApiResponse, DprShowApiResponse, SearchParamsComments } from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageApplicationComments } from "@/components/PageApplicationComments";
import { ContentNotFound } from "@/components/ContentNotFound";
import { getCommentTypeToShow } from "@/lib/comments";

interface PlanningApplicationDetailsCommentsProps {
  params: {
    council: string;
    reference: string;
  };
  searchParams?: SearchParamsComments;
}

async function fetchData({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsProps): Promise<
  ApiResponse<DprShowApiResponse | null>
> {
  const { reference, council } = params;
  const { type, orderBy } = searchParams ?? {};
  const appConfig = getAppConfig(council);
  const apiComments =
    type === "specialist" ? ApiV1.specialistComments : ApiV1.publicComments;
  const response = await apiComments(
    appConfig.council?.dataSource ?? "none",
    council,
    reference,
    {
      ...searchParams,
      page: searchParams?.page ?? 1,
      resultsPerPage: appConfig.defaults.resultsPerPage ?? 10,
      orderBy: orderBy ?? "desc",
    },
  );
  const application = await ApiV1.show(
    appConfig.council?.dataSource ?? "none",
    council,
    reference,
  );

  return {
    status: response.status,
    pagination: response.pagination,
    data: {
      response: response.data,
      application: application.data,
    },
  };
}
export async function generateMetadata({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsProps): Promise<Metadata | undefined> {
  const response = await fetchData({
    params,
    searchParams,
  });
  const { council, reference } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
  return {
    title: `Comments | Application ${reference} | ${councilName} Digital Planning Register`,
    description: `All comments for ${councilName} Council planning application ${reference}`,
  };
}

export default async function PlanningApplicationDetailsComments({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsProps) {
  const { council, reference } = params;
  const appConfig = getAppConfig(council);
  const type = getCommentTypeToShow(appConfig.council, searchParams);
  const response = await fetchData({
    params,
    searchParams,
  });
  if (
    !response ||
    response?.status?.code !== 200 ||
    appConfig?.council === undefined
  ) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  const availableCommentTypes = [
    appConfig.council.publicComments && "public",
    appConfig.council.specialistComments && "specialist",
  ].filter(Boolean);
  const application = response?.data.application;

  if (!application || availableCommentTypes.length === 0) {
    return (
      <PageMain>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageMain>
    );
  }

  return (
    <PageApplicationComments
      comments={response.data.response.comments}
      reference={reference}
      application={application}
      type={type}
      pagination={response.pagination}
      appConfig={appConfig}
      params={params}
      searchParams={searchParams}
    />
  );
}
