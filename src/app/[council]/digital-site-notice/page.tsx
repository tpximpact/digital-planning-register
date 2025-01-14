import { ApiResponse, DprSearchApiResponse, SearchParams } from "@/types";
import { Metadata } from "next";
import { ApiP05 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageSearchSiteNotices } from "@/components/PageSearchSiteNotices";
import { BackButton } from "@/components/BackButton";
import { ContentNotFound } from "@/components/ContentNotFound";
import { capitalizeFirstLetter } from "@/util";

interface DigitalSiteNoticeProps {
  params: {
    council: string;
  };
  searchParams?: SearchParams;
}

async function fetchData({
  params,
  searchParams,
}: DigitalSiteNoticeProps): Promise<ApiResponse<DprSearchApiResponse | null>> {
  const { council } = params;

  const appConfig = getAppConfig(council);
  const response = await ApiP05.search(
    appConfig.council?.dataSource ?? "none",
    council,
    {
      ...searchParams,
      type: "dsn",
      page: searchParams?.page ?? 1,
      resultsPerPage: appConfig.defaults.resultsPerPage ?? 10,
    },
  );

  return response;
}

export async function generateMetadata({
  params,
  searchParams,
}: DigitalSiteNoticeProps): Promise<Metadata> {
  const response = await fetchData({ params, searchParams });
  const { council } = params;
  const councilName = capitalizeFirstLetter(council);

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: `Digital Site Notice | ${councilName} Digital Planning Register`,
  };
}

const DigitalSiteNotice = async ({
  params,
  searchParams,
}: DigitalSiteNoticeProps) => {
  const { council } = params;
  const appConfig = getAppConfig(council);
  const baseUrl = `/${council}`;

  if (!appConfig.council?.features?.dsn) {
    return (
      <>
        <BackButton baseUrl={baseUrl} />
        <PageMain>
          <ContentNotFound />
        </PageMain>
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
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  return (
    <PageMain>
      <PageSearchSiteNotices
        appConfig={appConfig}
        applications={response.data?.data}
        pagination={response.data?.pagination}
        searchParams={searchParams}
      />
    </PageMain>
  );
};

export default DigitalSiteNotice;
