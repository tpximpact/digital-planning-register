import { AppConfig } from "@/config/types";
import { DprDocument, DprPlanningApplication } from "@/types";
import { CommentsList } from "@/components/CommentsList";
import ApplicationPeople from "../application_people";
import ApplicationInformation from "../application_information";
import { DocumentsList } from "@/components/DocumentsList";
import { PageWrapper } from "../PageWrapper";
import { ContentError } from "../ContentError";

export interface ApplicationDetailsProps {
  reference: string;
  appConfig: AppConfig;
  application: DprPlanningApplication;
  documents?: DprDocument[];
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
      {/* <ApplicationCard council={council} {...application} /> */}
      {appConfig?.council?.slug && (
        <ApplicationInformation
          councilSlug={appConfig.council.slug}
          {...application}
        />
      )}
      {/* <ApplicationLocation /> */}
      {/* <ApplicationMoreDetails {...application} /> */}
      <DocumentsList
        resultsPerPage={3}
        showMoreButton={true}
        documents={documents}
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
          showMoreButton={true}
          comments={application.application.consultation.consulteeComments}
        />
      )}
      {appConfig.council?.publicComments && (
        <CommentsList
          councilSlug={appConfig?.council?.slug}
          reference={reference}
          type="public"
          showMoreButton={true}
          comments={application.application.consultation.publishedComments}
        />
      )}
      {/* <ApplicationConstraints /> */}
    </>
  );
};
