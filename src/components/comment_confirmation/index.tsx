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

import { DprApplication } from "@/types";
import { Panel } from "../govuk/Panel";
import { Button } from "@/components/button";
import "./comment-confirmation.scss";
import { AppConfig } from "@/config/types";
import { ContextSetterWithSuspense } from "../ContextSetterWithSuspense";

interface CommentConfirmationProps {
  reference: string;
  council: string;
  application: DprApplication;
  navigateToPage?: (page: number, params?: object) => void;
  councilConfig: AppConfig["council"];
}

const CommentConfirmation = ({
  reference,
  council,
  application,
  councilConfig,
}: CommentConfirmationProps) => {
  const emailAlertsLink =
    councilConfig?.pageContent?.email_alerts?.sign_up_for_alerts_link;

  return (
    <>
      <Panel
        titleText="Comment submitted"
        text={<p>Thank you for your input</p>}
      />
      <ContextSetterWithSuspense
        councilSlug={council}
        reference={reference}
        application={application}
        showFeedbackBlurb={false}
      />
      <h2 className="govuk-heading-m">What happens now</h2>
      {/* Commented out for now as email confirmation isn't set up */}
      {/* <p className="govuk-body">
        If you provided your email, you will receive an email confirming that
        your comment was received.
      </p> */}
      <p className="govuk-body">
        Your comment will be published on this site once a member of the
        planning team has reviewed your comment and removed any identifying
        information. This can take several days, depending on the volume of
        comments being received.
      </p>
      <p className="govuk-body">
        You will not receive a direct reply, but your comment will be addressed
        in the decision report.
      </p>
      {emailAlertsLink && (
        <>
          <p className="govuk-body">
            You can sign up for email alerts to receive notifications when new
            comments are published, including your own comment. You can also
            receive notifications when anything else changes with this
            application.
          </p>
          <Button variant="information" href={emailAlertsLink} element="link">
            Sign up for email alerts
          </Button>
        </>
      )}
      <h2 className="govuk-heading-m">
        Discover other planning applications in your area
      </h2>
      <p className="govuk-body">
        If you&apos;re interested in learning more about planning applications
        in your area, you can view all currently active applications and provide
        comments on them.
      </p>
      <form action={`/${council}`} method="GET">
        <Button element="button" type="submit" variant="secondary">
          Back to application search
        </Button>
      </form>
    </>
  );
};

export default CommentConfirmation;
