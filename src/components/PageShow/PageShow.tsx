import { DprDocument, DprPlanningApplication, SearchParams } from "@/types";
import { BackButton, BackLink } from "@/components/BackButton";
import { AppConfig } from "@/config/types";
import { ApplicationDetails } from "../ApplicationDetails";
import { PageWrapper } from "../PageWrapper";
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
      <PageWrapper>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageWrapper>
    );
  }
  const baseUrl = `/${council}`;
  return (
    <>
      <BackButton baseUrl={baseUrl} />
      <PageWrapper>
        <ApplicationDetails
          reference={reference}
          application={application}
          documents={documents}
          appConfig={appConfig}
        />
      </PageWrapper>
    </>
  );
};
