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
  UnknownSearchParams,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageApplicationComments } from "@/components/PageApplicationComments";
import { ContentNotFound } from "@/components/ContentNotFound";
import { validateSearchParams } from "@/lib/comments";
import { CommentType } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentType";

interface PlanningApplicationDetailsCommentsProps {
  params: {
    council: string;
    reference: string;
  };
  searchParams?: UnknownSearchParams;
}

interface PlanningApplicationDetailsCommentsFetchProps
  extends Omit<PlanningApplicationDetailsCommentsProps, "searchParams"> {
  searchParams: SearchParamsComments;
  type: CommentType;
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

  return response;
}

async function fetchCommentData({
  params,
  searchParams,
  type,
}: PlanningApplicationDetailsCommentsFetchProps): Promise<
  ApiResponse<DprPublicCommentsApiResponse | DprSpecialistCommentsApiResponse>
> {
  const { council, reference } = params;
  const appConfig = getAppConfig(council);
  const apiComments =
    type === "specialist" ? ApiV1.specialistComments : ApiV1.publicComments;
  const dataSource = appConfig.council?.dataSource ?? "none";

  // fetch (filtered) comments
  const response = await apiComments(
    dataSource,
    council,
    reference,
    searchParams,
  );

  return response;
}

export async function generateMetadata({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsProps): Promise<Metadata | undefined> {
  const response = await fetchApplicationData({
    params,
  });
  const { council, reference } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";

  const appConfig = getAppConfig(council);
  const validSearchParams = validateSearchParams(appConfig, searchParams);
  const type = validSearchParams.type;

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
  return {
    title: `Comments ${type} | Application ${reference} | ${councilName} Digital Planning Register`,
    description: `All comments for ${councilName} Council planning application ${reference}`,
  };
}

export default async function PlanningApplicationDetailsComments({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsProps) {
  const { council } = params;
  const appConfig = getAppConfig(council);
  const validSearchParams = validateSearchParams(appConfig, searchParams);
  const type = validSearchParams.type;
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

  const commentResponse = await fetchCommentData({
    params,
    searchParams: validSearchParams,
    type,
  });

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
      application={application}
      type={type}
      pagination={commentResponse.pagination}
      appConfig={appConfig}
      params={params}
      searchParams={validSearchParams}
    />
  );
}
