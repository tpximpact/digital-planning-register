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

import { ApiResponse, DprApplicationSubmissionApiResponse } from "@/types";
import { Metadata } from "next";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageApplicationSubmission } from "@/components/PageApplicationSubmission";
import { ContentNotAccessible } from "@/components/ContentNotAccessible";

interface ApplicationFormProps {
  params: {
    council: string;
    reference: string;
  };
}

async function fetchData({
  params,
}: ApplicationFormProps): Promise<
  ApiResponse<DprApplicationSubmissionApiResponse | null>
> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const response = await ApiV1.applicationSubmission(
    appConfig.council?.dataSource ?? "none",
    council,
    reference,
  );
  return response;
}

export async function generateMetadata({
  params,
}: ApplicationFormProps): Promise<Metadata | undefined> {
  const response = await fetchData({ params });
  const { reference, council } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";
  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
  return {
    title: `Application form as submitted`,
    description: `Application form as submitted for ${councilName} Council planning application ${reference}`,
  };
}

export default async function ApplicationFormPage({
  params,
}: ApplicationFormProps) {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const response = await fetchData({ params });

  if (
    !response ||
    response?.status?.code !== 200 ||
    appConfig.council === undefined
  ) {
    if (response?.status?.code === 422) {
      return (
        <PageMain>
          <ContentNotAccessible />
        </PageMain>
      );
    }
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  return (
    <PageApplicationSubmission
      reference={reference}
      applicationSubmissionData={response?.data?.submission}
      council={council}
    />
  );
}
