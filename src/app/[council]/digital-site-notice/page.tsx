import ApplicationMap from "@/components/application_map";
import { ApiResponse, DprSearch, SearchParams } from "@/types";
import { Metadata } from "next";
import NotFound from "../../not-found";
import Pagination from "@/components/pagination";
import { redirect } from "next/navigation";
import { ApiP05 } from "@/actions/api";
import { ContentNoResult } from "@/components/ContentNoResult";
import { getAppConfig } from "@/config";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { PageSearchSiteNotices } from "@/components/PageSearchSiteNotices";
import { BackLink } from "@/components/button";
import { ContentNotFound } from "@/components/ContentNotFound";

const resultsPerPage = 10;

interface DigitalSiteNoticeProps {
  params: {
    council: string;
  };
  searchParams?: SearchParams;
}

async function fetchData({
  params,
  searchParams,
}: DigitalSiteNoticeProps): Promise<ApiResponse<DprSearch | null>> {
  const { council } = params;

  const page = searchParams?.page ? searchParams.page : 1;
  const tweakedSearchParams = {
    type: "dsn",
    page,
    resultsPerPage: 10,
    ...searchParams,
  };

  const appConfig = getAppConfig(council);
  const response = await ApiP05.search(
    appConfig.council?.dataSource ?? "none",
    council,
    tweakedSearchParams,
  );

  return response;
}

export async function generateMetadata({
  params,
  searchParams,
}: DigitalSiteNoticeProps): Promise<Metadata> {
  const response = await fetchData({ params, searchParams });

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: `Digital Site Notice`,
  };
}

const DigitalSiteNotice = async ({
  params,
  searchParams,
}: DigitalSiteNoticeProps) => {
  const { council } = params;
  const appConfig = getAppConfig(council);

  if (!appConfig.council?.isShowDSN) {
    return (
      <>
        <BackLink />
        <div className="govuk-main-wrapper">
          <ContentNotFound />
        </div>
      </>
    );
  }

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
    <PageSearchSiteNotices
      appConfig={appConfig}
      applications={response.data?.data}
      pagination={response.data?.pagination}
      searchParams={searchParams}
    />
  );
};

export default DigitalSiteNotice;
