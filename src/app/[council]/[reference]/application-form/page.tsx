import { ApiResponse, DprApplicationSubmissionApiResponse } from "@/types";
import { Metadata } from "next";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageApplicationSubmission } from "@/components/PageApplicationSubmission";
import { capitalizeFirstLetter } from "@/util";

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
  const councilName = capitalizeFirstLetter(council);
  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
  return {
    title: `Application form as submitted | Application ${reference} | ${councilName} Digital Planning Register`,
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
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  const submittedAt = response?.data?.submission?.metadata.submittedAt;
  const applicationSubmissionData = response?.data?.submission?.data;

  return (
    <PageApplicationSubmission
      reference={reference}
      submittedAt={submittedAt}
      applicationSubmissionData={applicationSubmissionData}
      council={council}
    />
  );
}
