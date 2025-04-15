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
  DprShowApiResponse,
  DprDocumentsApiResponse,
  SearchParams,
} from "@/types";
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
  searchParams?: SearchParams;
}

async function fetchData({ params }: PlanningApplicationDetailsProps): Promise<{
  applicationResponse: ApiResponse<DprShowApiResponse | null>;
  documentResponse: ApiResponse<DprDocumentsApiResponse | null>;
}> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const [applicationResponse, documentResponse] = await Promise.all([
    ApiV1.show(appConfig.council?.dataSource ?? "none", council, reference),
    ApiV1.documents(
      appConfig.council?.dataSource ?? "none",
      council,
      reference,
    ),
  ]);
  return { applicationResponse, documentResponse };
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsProps): Promise<Metadata | undefined> {
  const { applicationResponse } = await fetchData({ params });
  const { reference, council } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";

  if (!applicationResponse.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
  return {
    title: `Application ${reference}`,
    description: `${councilName} planning application ${reference}`,
  };
}

const PlanningApplicationDetails = async ({
  params,
  searchParams,
}: PlanningApplicationDetailsProps) => {
  const { council, reference } = params;
  const appConfig = getAppConfig(council);
  const { applicationResponse, documentResponse } = await fetchData({ params });
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
  const documents = documentResponse?.data ?? null;

  if (application) {
    trackServer(`siteNoticeTracking`, {
      council,
      reference: reference,
      searchParams: JSON.stringify(searchParams),
    });
  }

  return (
    <PageShow
      appConfig={appConfig}
      application={application}
      documents={documents}
      params={params}
    />
  );
};

export default PlanningApplicationDetails;
