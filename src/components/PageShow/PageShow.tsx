import { DprDocument, DprPlanningApplication, SearchParams } from "@/types";
import { BackButton } from "@/components/BackButton";
import { AppConfig } from "@/config/types";
import { ApplicationDetails } from "../ApplicationDetails";
import { PageMain } from "../PageMain";
import { ContentNotFound } from "../ContentNotFound";

export interface PageShowProps {
  appConfig: AppConfig;
  application: DprPlanningApplication | null;
  documents: DprDocument[] | null;
  params: {
    council: string;
    reference: string;
  };
  searchParams?: SearchParams;
}

export const PageShow = ({
  appConfig,
  application,
  documents,
  params,
}: PageShowProps) => {
  const { council, reference } = params;

  if (!application) {
    return (
      <PageMain>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageMain>
    );
  }
  const baseUrl = `/${council}`;
  return (
    <>
      <BackButton baseUrl={baseUrl} />
      <PageMain>
        <ApplicationDetails
          reference={reference}
          application={application}
          documents={documents}
          appConfig={appConfig}
        />
      </PageMain>
    </>
  );
};
