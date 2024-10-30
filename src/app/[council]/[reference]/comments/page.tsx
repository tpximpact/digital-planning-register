import { Metadata } from "next";
import { ApiResponse, DprShow, SearchParams } from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { PageApplicationComments } from "@/components/PageApplicationComments";
import { ContentNotFound } from "@/components/ContentNotFound";
import { buildCommentResult, getCommentTypeToShow } from "@/lib/comments";

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
  ApiResponse<DprShow | null>
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

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
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
      <PageWrapper>
        <ContentError />
      </PageWrapper>
    );
  }

  const availableCommentTypes = [
    appConfig.council.publicComments && "public",
    appConfig.council.specialistComments && "specialist",
  ].filter(Boolean);
  const application = response?.data;

  if (!application || availableCommentTypes.length === 0) {
    return (
      <PageWrapper>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageWrapper>
    );
  }

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
      application={application}
      type={type}
      comments={commentData.data}
      pagination={commentData.pagination}
      appConfig={appConfig}
      params={params}
      searchParams={searchParams}
    />
  );
}
