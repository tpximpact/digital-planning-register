/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { AppConfig } from "@/config/types";
import { DprDocument, DprPlanningApplication } from "@/types";
import { CommentsList } from "@/components/CommentsList";
import { ApplicationPeople } from "../ApplicationPeople";
import { ApplicationHero } from "../ApplicationHero";
import { DocumentsList } from "@/components/DocumentsList";
import { ContentError } from "../ContentError";
import "./ApplicationDetails.scss";
import { ContentSidebar } from "../ContentSidebar";
import { slugify } from "@/util";
import { Button } from "@/components/button";
import { ApplicationProgressInfo } from "../ApplicationProgressInfo";
import { buildApplicationProgress } from "@/lib/planningApplication/progress";
import { ApplicationAppeals } from "../ApplicationAppeals";
import { ImpactMeasures } from "../ImpactMeasures";

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
    return <ContentError />;
  }

  const applicationStatus = application.application.status;
  const councilSlug = appConfig.council.slug;
  const description = application.proposal.description;
  const people = application.officer || application.applicant;
  const commentsEnabled =
    application.application.consultation.allowComments ?? true;
  const applicationProgress = buildApplicationProgress(application);
  const appeal = application.application.appeal;
  const { url: decisionNoticeUrl } =
    documents?.find((d) => d.title === "Decision notice") ?? {};

  const sidebar = [
    {
      key: slugify("Key information"),
      title: "Key information",
    },
  ];

  if (applicationProgress) {
    sidebar.push({
      key: slugify("Progress"),
      title: "Progress",
    });
  }

  if (description) {
    sidebar.push({
      key: slugify("Description"),
      title: "Description",
    });
  }

  if (appeal?.reason || appeal?.documents) {
    sidebar.push({
      key: slugify("Appeal"),
      title: "Appeal",
    });
  }

  sidebar.push({
    key: slugify("Documents"),
    title: "Documents",
  });

  if (people) {
    sidebar.push({
      key: slugify("People"),
      title: "People",
    });
  }

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
      <h1>
        <span className="govuk-heading-s">Application reference</span>
        <span className="govuk-heading-l">{reference}</span>
      </h1>
      <ApplicationHero
        councilSlug={appConfig.council.slug}
        application={application}
      />
      <div className="govuk-grid-row dpr-application-details__content">
        <div className="govuk-grid-column-one-third-from-desktop dpr-application-details__sidebar">
          <ContentSidebar content={sidebar} />
          {applicationStatus !== "determined" && commentsEnabled && (
            <Button
              variant="primary"
              element="link"
              href={`/${councilSlug}/${reference}/submit-comment`}
            >
              Comment on this application
            </Button>
          )}

          {appConfig.council?.pageContent?.email_alerts
            ?.sign_up_for_alerts_link && (
            <Button
              href={
                appConfig.council?.pageContent?.email_alerts
                  ?.sign_up_for_alerts_link
              }
              element="link"
              ariaLabel="Sign up for email alerts"
              variant="information"
            >
              Sign up for email alerts
            </Button>
          )}
        </div>
        <div className="govuk-grid-column-two-thirds-from-desktop dpr-application-details--flow">
          <ApplicationProgressInfo
            councilSlug={appConfig.council.slug}
            reference={reference}
            sections={applicationProgress}
            decisionNoticeUrl={decisionNoticeUrl}
          />
          <h2 className="govuk-heading-l" id="description">
            Description
          </h2>
          <p className="govuk-body">{description}</p>
          {(appeal?.documents || appeal?.reason) && (
            <ApplicationAppeals
              appealReason={appeal?.reason}
              appealDocuments={appeal?.documents}
            />
          )}
          {/* <ImpactMeasures /> */}
          <DocumentsList
            councilSlug={appConfig?.council?.slug}
            reference={reference}
            showMoreButton={true}
            documents={documents?.slice(0, 6) ?? null}
            totalDocuments={documents?.length ?? 0}
          />
          <ApplicationPeople
            applicant={application.applicant}
            caseOfficer={application.officer}
          />
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
