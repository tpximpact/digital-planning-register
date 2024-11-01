import { AppConfig } from "@/config/types";
import { DprDocument, DprPlanningApplication } from "@/types";
import { CommentsList } from "@/components/CommentsList";
import { ApplicationPeople } from "../ApplicationPeople";
import { ApplicationDetailsInformation } from "../ApplicationDetailsInformation";
import { DocumentsList } from "@/components/DocumentsList";
import { PageWrapper } from "../PageWrapper";
import { ContentError } from "../ContentError";

export interface ApplicationDetailsProps {
  reference: string;
  appConfig: AppConfig;
  application: DprPlanningApplication;
  documents: DprDocument[] | null;
}

export const ApplicationDetails = ({
  reference,
  appConfig,
  application,
  documents,
}: ApplicationDetailsProps) => {
  if (!appConfig.council) {
    return (
      <PageWrapper>
        <ContentError />
      </PageWrapper>
    );
  }
  return (
    <>
      {/* <ApplicationCard council={council} application={application} /> */}
      {appConfig?.council?.slug && (
        <ApplicationDetailsInformation
          councilSlug={appConfig.council.slug}
          application={application}
        />
      )}
      {/* <ApplicationLocation /> */}
      {/* <ApplicationMoreDetails {...application} /> */}
      <DocumentsList
        councilSlug={appConfig?.council?.slug}
        reference={reference}
        showMoreButton={true}
        documents={documents?.slice(0, 3) ?? null}
        totalDocuments={documents?.length ?? 0}
      />
      <ApplicationPeople
        applicant_first_name={application.application.applicant_first_name}
        applicant_last_name={application.application.applicant_last_name}
        agent_first_name={application.application.agent_first_name}
        agent_last_name={application.application.agent_last_name}
      />
      {appConfig.council?.specialistComments && (
        <CommentsList
          councilSlug={appConfig?.council?.slug}
          reference={reference}
          type="specialist"
          pagination={{
            page: 1,
            results: 3,
          }}
          showMoreButton={true}
          comments={application.application.consultation.consulteeComments}
        />
      )}
      {appConfig.council?.publicComments && (
        <CommentsList
          councilSlug={appConfig?.council?.slug}
          reference={reference}
          type="public"
          pagination={{
            page: 1,
            results: 3,
          }}
          showMoreButton={true}
          comments={application.application.consultation.publishedComments}
        />
      )}
      {/* <ApplicationConstraints /> */}
    </>
  );
};
