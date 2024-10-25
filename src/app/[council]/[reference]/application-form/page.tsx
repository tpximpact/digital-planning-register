import { ApiResponse, DprApiApplicationSubmissionResponse } from "@/types";
import { Metadata } from "next";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { ContentNotFound } from "@/components/ContentNotFound";
import { PageApplicationSubmission } from "@/components/PageApplicationSubmission";

interface ApplicationFormProps {
  params: {
    council: string;
    reference: string;
  };
}

async function fetchData({
  params,
}: ApplicationFormProps): Promise<
  ApiResponse<DprApiApplicationSubmissionResponse | null>
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
  const application = response.data?.application;

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

  if (!application) {
    return (
      <PageWrapper>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageWrapper>
    );
  }

  const submission = response.data?.submission ?? null;

  return (
    <PageApplicationSubmission
      application={application}
      submission={submission}
    />
  );
}
