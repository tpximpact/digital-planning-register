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
import { DprApplication, DprDocument } from "@/types";
import { ApplicationPeople } from "@/components/ApplicationPeople";
import { ApplicationHero } from "@/components/ApplicationHero";
import { DocumentsListWithSuspense } from "@/components/DocumentsListWithSuspense";
import { ContentError } from "@/components/ContentError";
import "./ApplicationDetails.scss";
import { ContentSidebar } from "@/components/ContentSidebar";
import { slugify } from "@/util";
import { Button } from "@/components/button";
import { ApplicationProgressInfo } from "@/components/ApplicationProgressInfo";
import { buildApplicationProgress } from "@/lib/planningApplication/progress";
import { ApplicationAppeals } from "@/components/ApplicationAppeals";
// import { ImpactMeasures } from "@/components/ImpactMeasures";
import { checkCommentsEnabled } from "@/lib/comments";
import { getDescription } from "@/lib/planningApplication/application";
import { CommentsSummaryWithSuspense } from "@/components/CommentsSummaryWithSuspense";
import {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/CommentSummary";

export interface ApplicationDetailsProps {
  reference: string;
  appConfig: AppConfig;
  application: DprApplication;
  documents?: DprDocument[];
  publicCommentSummary?: PublicCommentSummary;
  specialistCommentSummary?: SpecialistCommentSummary;
}

export const ApplicationDetails = ({
  reference,
  appConfig,
  application,
  documents,
  publicCommentSummary,
  specialistCommentSummary,
}: ApplicationDetailsProps) => {
  if (!appConfig.council) {
    return <ContentError />;
  }

  const commentsEnabled = checkCommentsEnabled(application);
  const councilSlug = appConfig.council.slug;
  const description = getDescription(application.submission.data.proposal);
  const people =
    application.data.caseOfficer.name || application.submission.data.applicant;
  const applicationProgress = buildApplicationProgress(application);
  const appeal = application.data.appeal;
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

  if (appeal?.reason || appeal?.files) {
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
      key: slugify("Specialist comments summary"),
      title: "Specialist comments",
    });
  }

  if (appConfig.council?.publicComments) {
    sidebar.push({
      key: slugify("Public comments summary"),
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
          {commentsEnabled && (
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
            sections={applicationProgress}
            decisionNoticeUrl={decisionNoticeUrl}
          />
          <h2 className="govuk-heading-l" id="description">
            Description
          </h2>
          <p className="govuk-body">{description}</p>
          {(appeal?.files || appeal?.reason) && (
            <ApplicationAppeals
              appealReason={appeal?.reason}
              appealDocuments={appeal?.files}
            />
          )}
          {/* <ImpactMeasures /> */}
          <DocumentsListWithSuspense
            councilSlug={appConfig?.council?.slug}
            reference={reference}
            documentsToShow={6}
            // this enables us to show this component in storybook without needing to fetch documents
            {...(documents !== undefined
              ? { documents, totalDocuments: documents.length }
              : {})}
          />
          <ApplicationPeople
            applicant={application.submission.data.applicant}
            caseOfficer={application.data.caseOfficer}
          />
          {/* <ApplicationConstraints /> */}
          {appConfig.council?.specialistComments && (
            <CommentsSummaryWithSuspense
              params={{ council: councilSlug, reference: reference }}
              type="specialist"
              // this enables us to show this component in storybook without needing to fetch comments
              {...(specialistCommentSummary !== undefined
                ? { summary: specialistCommentSummary }
                : {})}
            />
          )}
          {appConfig.council?.publicComments && (
            <CommentsSummaryWithSuspense
              params={{ council: councilSlug, reference: reference }}
              type="public"
              // this enables us to show this component in storybook without needing to fetch comments
              {...(publicCommentSummary !== undefined
                ? { summary: publicCommentSummary }
                : {})}
            />
          )}
        </div>
      </div>
    </article>
  );
};
