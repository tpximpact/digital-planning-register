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
  SearchParamsDocuments,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { ContentNotFound } from "@/components/ContentNotFound";
import { buildDocumentData } from "@/lib/documents";
import { PageApplicationDocuments } from "@/components/PageApplicationDocuments";

interface PlanningApplicationDetailsDocumentsProps {
  params: {
    council: string;
    reference: string;
  };
  searchParams?: SearchParamsDocuments;
}

async function fetchData({
  params,
  searchParams,
}: PlanningApplicationDetailsDocumentsProps): Promise<{
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
      {
        ...searchParams,
        page: searchParams?.page ? Number(searchParams.page) : 1,
        resultsPerPage: searchParams?.resultsPerPage
          ? Number(searchParams.resultsPerPage)
          : appConfig.defaults.resultsPerPage,
      },
    ),
  ]);
  return { applicationResponse, documentResponse };
}

export async function generateMetadata({
  params,
  searchParams,
}: PlanningApplicationDetailsDocumentsProps): Promise<Metadata | undefined> {
  const { applicationResponse } = await fetchData({ params, searchParams });
  const { reference, council } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";

  if (!applicationResponse.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
  return {
    title: `Documents | Application ${reference} | ${councilName} Digital Planning Register`,
    description: `All documents for ${councilName} Council planning application ${reference}`,
  };
}

export default async function PlanningApplicationDetailsDocuments({
  params,
  searchParams,
}: PlanningApplicationDetailsDocumentsProps) {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const { applicationResponse, documentResponse } = await fetchData({ params });

  if (
    !documentResponse ||
    documentResponse?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  const application = applicationResponse?.data;
  const documents = documentResponse?.data;

  if (!documents || !application) {
    return (
      <PageMain>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageMain>
    );
  }

  const documentData = buildDocumentData(documents, searchParams);

  return (
    <PageApplicationDocuments
      reference={reference}
      application={application}
      documents={documentData.data}
      pagination={documentData.pagination}
      appConfig={appConfig}
      params={params}
      searchParams={searchParams}
    />
  );
}
