import { Metadata } from "next";
import {
  ApiResponse,
  DprShowApiResponse,
  DprDocumentsApiResponse,
} from "@/types";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { ContentError } from "@/components/ContentError";
import { PageShow } from "@/components/PageShow";
import { capitalizeFirstLetter } from "@/util";

interface PlanningApplicationDetailsProps {
  params: {
    council: string;
    reference: string;
  };
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
  const councilName = capitalizeFirstLetter(council);

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
}: PlanningApplicationDetailsProps) => {
  const { reference, council } = params;
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
  const documents = documentResponse?.data?.files ?? null;

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
