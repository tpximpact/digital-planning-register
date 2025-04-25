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
  DprPublicCommentsApiResponse,
  DprShowApiResponse,
  DprSpecialistCommentsApiResponse,
  SearchParamsComments,
} from "@/types";
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

async function fetchApplicationData({
  params,
}: {
  params: { council: string; reference: string };
}): Promise<ApiResponse<DprShowApiResponse>> {
  const { council, reference } = params;
  const appConfig = getAppConfig(council);
  const dataSource = appConfig.council?.dataSource ?? "none";

  const response = await ApiV1.show(dataSource, council, reference);
  return {
    status: response.status,
    data: response.data,
  };
}

async function fetchCommentData({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsProps): Promise<
  ApiResponse<DprPublicCommentsApiResponse | DprSpecialistCommentsApiResponse>
> {
  const { council, reference } = params;
  const { type, sortBy, orderBy, page, resultsPerPage } = searchParams ?? {};
  const appConfig = getAppConfig(council);
  const dataSource = appConfig.council?.dataSource ?? "none";

  const apiComments =
    type === "specialist" ? ApiV1.specialistComments : ApiV1.publicComments;
  const response = await apiComments(dataSource, council, reference, {
    ...searchParams,
    page: page ?? 1,
    resultsPerPage: resultsPerPage ?? appConfig.defaults.resultsPerPage,
    orderBy: orderBy ?? "desc",
    sortBy: sortBy ?? "receivedAt",
  });

  return {
    status: response.status,
    pagination: response.pagination,
    data: response.data,
  };
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsCommentsProps): Promise<Metadata | undefined> {
  const response = await fetchApplicationData({
    params,
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
  const applicationResponse = await fetchApplicationData({ params });
  if (
    applicationResponse.status.code !== 200 ||
    !applicationResponse.data ||
    !appConfig.council
  ) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }
  const application = applicationResponse.data;

  const commentResponse = await fetchCommentData({ params, searchParams });
  if (commentResponse.status.code !== 200 || !commentResponse.data) {
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

  if (availableCommentTypes.length === 0) {
    return (
      <PageMain>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageMain>
    );
  }

  return (
    <PageApplicationComments
      comments={commentResponse.data.comments}
      reference={reference}
      application={application}
      type={type}
      pagination={commentResponse.pagination}
      appConfig={appConfig}
      params={params}
      searchParams={searchParams}
    />
  );
}
