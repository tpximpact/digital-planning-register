import { capitaliseWord, formatDprDateTime } from "@/util";
import { ApiResponse, DprApplicationSubmission } from "@/types";
import { Metadata } from "next";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageApplicationSubmission } from "@/components/PageApplicationSubmission";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { ContentNotFound } from "@/components/ContentNotFound";

interface ApplicationFormProps {
  params: {
    council: string;
    reference: string;
  };
}

async function fetchData({
  params,
}: ApplicationFormProps): Promise<
  ApiResponse<DprApplicationSubmission | null>
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

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }
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
      <PageWrapper>
        <ContentError />
      </PageWrapper>
    );
  }

  const submittedAt = response?.data?.submission?.metadata.submittedAt;
  const applicationSubmissionData = response?.data?.submission?.data;

  if (!applicationSubmissionData) {
    return (
      <PageWrapper>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageWrapper>
    );
  }

  return (
    <PageApplicationSubmission
      reference={reference}
      submittedAt={submittedAt}
      applicationSubmissionData={applicationSubmissionData}
    />
  );
}
