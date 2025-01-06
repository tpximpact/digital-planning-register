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
      applications={response.data?.data}
      pagination={response.data?.pagination}
      params={params}
      searchParams={searchParams}
    />
  );
}
