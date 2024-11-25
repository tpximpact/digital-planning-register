import { AppConfig } from "@/config/types";
import { DprDocument, DprPlanningApplication } from "@/types";
import { CommentsList } from "@/components/CommentsList";
import { ApplicationPeople } from "../ApplicationPeople";
import { ApplicationHero } from "../ApplicationHero";
import { DocumentsList } from "@/components/DocumentsList";
import { PageWrapper } from "../PageWrapper";
import { ContentError } from "../ContentError";
import Link from "next/link";

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

  const description = application.proposal.description;
  const applicationStatus = application.application.status;
  const councilSlug = appConfig.council.slug;

  return (
    <>
      {/* <ApplicationCard council={council} application={application} /> */}
      {appConfig?.council?.slug && (
        <ApplicationHero
          councilSlug={appConfig.council.slug}
          application={application}
        />
      )}
      <dl>
        <dt className="govuk-heading-l">Description</dt>
        <dd className="govuk-body" id="application-description">
          {description}
        </dd>
      </dl>
      {applicationStatus !== "determined" && (
        <div className="govuk-grid-row extra-top-margin">
          <div className="govuk-grid-column-full">
            <Link
              href={`/${councilSlug}/${reference}/submit-comment`}
              className="govuk-button govuk-button--primary"
              data-module="govuk-button"
            >
              Comment on this application
            </Link>
          </div>
        </div>
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
      <ApplicationPeople applicant={application.applicant} />
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
