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
import { ApiResponse, DprShowApiResponse, UnknownSearchParams } from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageShow } from "@/components/PageShow";
import { trackServer } from "@/lib/dprAnalytics";

interface PlanningApplicationDetailsProps {
  params: {
    council: string;
    reference: string;
  };
  searchParams?: UnknownSearchParams;
}

async function fetchData({
  params,
}: PlanningApplicationDetailsProps): Promise<
  ApiResponse<DprShowApiResponse | null>
> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const applicationResponse = await ApiV1.show(
    appConfig.council?.dataSource ?? "none",
    council,
    reference,
  );
  return applicationResponse;
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsProps): Promise<Metadata | undefined> {
  const applicationResponse = await fetchData({ params });

  if (!applicationResponse.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
}

const PlanningApplicationDetails = async ({
  params,
  searchParams,
}: PlanningApplicationDetailsProps) => {
  const { council, reference } = params;
  const appConfig = getAppConfig(council);
  const applicationResponse = await fetchData({ params });
  if (
    !applicationResponse ||
    applicationResponse?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }
  const application = applicationResponse.data;

  if (application) {
    trackServer(`siteNoticeTracking`, {
      council,
      reference: reference,
      searchParams: JSON.stringify(searchParams),
    });
  }

  return (
    <PageShow appConfig={appConfig} application={application} params={params} />
  );
};

export default PlanningApplicationDetails;
