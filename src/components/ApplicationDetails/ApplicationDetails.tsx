import { AppConfig } from "@/config/types";
import { documents } from "@/handlers/bops/v2";
import { DprDocument, DprPlanningApplication } from "@/types";
import CommentsList from "../comments_list";
import ApplicationPeople from "../application_people";
import DocumentsList from "../documents_list";
import ApplicationInformation from "../application_information";

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
        councilSlug={appConfig?.council?.slug}
        reference={reference}
        showMoreButton={true}
        documents={documents ?? null}
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
          type="consultee"
          showMoreButton={true}
          comments={application.application.consultation.consulteeComments}
        />
      )}
      {appConfig.council?.publicComments && (
        <CommentsList
          councilSlug={appConfig?.council?.slug}
          reference={reference}
          type="published"
          showMoreButton={true}
          comments={application.application.consultation.publishedComments}
        />
      )}
      {/* <ApplicationConstraints /> */}
    </>
  );
};
