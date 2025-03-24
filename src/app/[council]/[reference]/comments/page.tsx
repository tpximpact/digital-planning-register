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
import { ApiResponse, DprShowApiResponse, SearchParams } from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageApplicationComments } from "@/components/PageApplicationComments";
import { ContentNotFound } from "@/components/ContentNotFound";
import { buildCommentResult, getCommentTypeToShow } from "@/lib/comments";
import { convertToDprApplication } from "@/lib/planningApplication/converter";

interface PlanningApplicationDetailsCommentsProps {
  params: {
    council: string;
    reference: string;
  };
  searchParams?: SearchParams;
}

async function fetchData({
  params,
}: PlanningApplicationDetailsCommentsProps): Promise<
  ApiResponse<DprShowApiResponse | null>
> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const response = await ApiV1.show(
    appConfig.council?.dataSource ?? "none",
    council,
    reference,
  );
  return response;
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsCommentsProps): Promise<Metadata | undefined> {
  const response = await fetchData({ params });
  const { reference, council } = params;
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
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const response = await fetchData({ params });

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

  const availableCommentTypes = [
    appConfig.council.publicComments && "public",
    appConfig.council.specialistComments && "specialist",
  ].filter(Boolean);
  const application = response?.data;

  if (!application || availableCommentTypes.length === 0) {
    return (
      <PageMain>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageMain>
    );
  }
  const convertedApplication = convertToDprApplication(application);

  const type = getCommentTypeToShow(appConfig.council, searchParams);
  const commentData = buildCommentResult(
    appConfig,
    type,
    application,
    searchParams,
  );

  return (
    <PageApplicationComments
      reference={reference}
      application={convertedApplication}
      type={type}
      comments={commentData.data}
      pagination={commentData.pagination}
      appConfig={appConfig}
      params={params}
      searchParams={searchParams}
    />
  );
}
