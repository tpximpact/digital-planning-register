import { AppConfig } from "@/config/types";
import { DprDocument, DprPlanningApplication } from "@/types";
import { CommentsList } from "@/components/CommentsList";
import { ApplicationPeople } from "../ApplicationPeople";
import { ApplicationHero } from "../ApplicationHero";
import { DocumentsList } from "@/components/DocumentsList";
import { PageWrapper } from "../PageWrapper";
import { ContentError } from "../ContentError";
import "./ApplicationDetails.scss";
import { ContentSidebar } from "../ContentSidebar";
import { slugify } from "@/util";
import Link from "next/link";
import { LinkButton } from "../button";

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

  const applicationStatus = application.application.status;
  const councilSlug = appConfig.council.slug;
  const description = application.proposal.description;
  const commentsEnabled =
    application.application.consultation.allowComments ?? true;

  const sidebar = [
    {
      key: slugify("Key information"),
      title: "Key information",
    },
  ];

  if (description) {
    sidebar.push({
      key: slugify("Description"),
      title: "Description",
    });
  }

  sidebar.push(
    {
      key: slugify("Documents"),
      title: "Documents",
    },
    {
      key: slugify("People"),
      title: "People",
    },
  );

  if (appConfig.council?.specialistComments) {
    sidebar.push({
      key: slugify("Specialist comments"),
      title: "Specialist comments",
    });
  }

  if (appConfig.council?.publicComments) {
    sidebar.push({
      key: slugify("Public comments"),
      title: "Public comments",
    });
  }

  return (
    <article className="dpr-application-details dpr-application-details--flow  dpr-application-details--sticky">
      {/* @TODO when we have site notice this will be name of the site according to the design */}
      <h1 className="govuk-heading-l">{reference}</h1>
      <ApplicationHero
        councilSlug={appConfig.council.slug}
        application={application}
      />
      <div className="govuk-grid-row dpr-application-details__content">
        <div className="govuk-grid-column-one-third-from-desktop dpr-application-details__sidebar">
          <ContentSidebar content={sidebar} />

          {applicationStatus !== "determined" && commentsEnabled && (
            <Link
              href={`/${councilSlug}/${reference}/submit-comment`}
              className="govuk-button govuk-button--primary"
              data-module="govuk-button"
            >
              Comment on this application
            </Link>
          )}

          {appConfig.council?.pageContent?.email_alerts
            ?.sign_up_for_alerts_link && (
            <LinkButton
              href={
                appConfig.council?.pageContent?.email_alerts
                  ?.sign_up_for_alerts_link
              }
              text="Sign up for email alerts"
            />
          )}
        </div>
        <div className="govuk-grid-column-two-thirds-from-desktop dpr-application-details--flow">
          <h2 className="govuk-heading-l" id="description">
            Description
          </h2>
          <p className="govuk-body">{description}</p>
          <DocumentsList
            councilSlug={appConfig?.council?.slug}
            reference={reference}
            showMoreButton={true}
            documents={documents?.slice(0, 6) ?? null}
            totalDocuments={documents?.length ?? 0}
          />
          <ApplicationPeople applicant={application.applicant} />
          {/* <ApplicationConstraints /> */}
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
        </div>
      </div>
    </article>
  );
};
