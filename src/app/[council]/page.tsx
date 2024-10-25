import React from "react";
import { ApiResponse, DprApiSearchResponse, SearchParams } from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { ContentError } from "@/components/ContentError";
import { PageWrapper } from "@/components/PageWrapper";
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
}: HomeProps): Promise<ApiResponse<DprApiSearchResponse | null>> {
  const { council } = params;
  const appConfig = getAppConfig(council);

  const response = await ApiV1.search(
    appConfig.council?.dataSource ?? "none",
    council,
    searchParams,
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
      <PageWrapper>
        <ContentError />
      </PageWrapper>
    );
  }

  return (
    <PageSearch
      appConfig={appConfig}
      applications={response.data?.data}
      pagination={response.data?.pagination}
      searchParams={searchParams}
    />
  );
}
