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
  DprDocumentsApiResponse,
  SearchParamsDocuments,
  UnknownSearchParams,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { validateSearchParams } from "@/lib/documents";
import { PageApplicationDocuments } from "@/components/PageApplicationDocuments";

interface PlanningApplicationDetailsDocumentsProps {
  params: {
    council: string;
    reference: string;
  };
  searchParams?: UnknownSearchParams;
}

interface PlanningApplicationDetailsDocumentsFetchProps
  extends Omit<PlanningApplicationDetailsDocumentsProps, "searchParams"> {
  searchParams: SearchParamsDocuments;
}

async function fetchData({
  params,
  searchParams,
}: PlanningApplicationDetailsDocumentsFetchProps): Promise<
  ApiResponse<DprDocumentsApiResponse | null>
> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const response = await ApiV1.documents(
    appConfig.council?.dataSource ?? "none",
    council,
    reference,
    searchParams,
  );
  return response;
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsDocumentsProps): Promise<Metadata | undefined> {
  const { council, reference } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";

  return {
    title: `Documents`,
    description: `All documents for ${councilName} Council planning application ${reference}`,
  };
}

export default async function PlanningApplicationDetailsDocuments({
  params,
  searchParams,
}: PlanningApplicationDetailsDocumentsProps) {
  const { council } = params;
  const appConfig = getAppConfig(council);

  if (appConfig.council === undefined) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  const validSearchParams = validateSearchParams(appConfig, searchParams);
  const documentResponse = await fetchData({
    params,
    searchParams: validSearchParams,
  });

  if (!documentResponse || documentResponse?.status?.code !== 200) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  return (
    <PageApplicationDocuments
      documents={documentResponse.data}
      pagination={documentResponse.pagination}
      appConfig={appConfig}
      params={params}
      searchParams={validSearchParams}
    />
  );
}
