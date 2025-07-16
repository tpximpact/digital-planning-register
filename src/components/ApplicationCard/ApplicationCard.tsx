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

import { DprApplication, DprContentPage } from "@/types";
import "./ApplicationCard.scss";
import {
  contentDecisions,
  getPrimaryApplicationType,
} from "@/lib/planningApplication";
import { ApplicationDataField } from "../ApplicationDataField";
import { Button } from "../button";
import { ApplicationMapLoader } from "../ApplicationMap";
import { InfoIcon } from "../InfoIcon";
import {
  formatDateToDprDate,
  formatDateTimeToDprDate,
  findItemByKey,
  splitStringOnOrBeforeMaxChars,
} from "@/util";
import {
  getCouncilDecision,
  getCouncilDecisionDate,
  getDescription,
  getPropertyAddress,
} from "@/lib/planningApplication/application";

export interface ApplicationCardProps {
  councilSlug: string;
  application: DprApplication;
}

export const ApplicationCard = ({
  councilSlug,
  application,
}: ApplicationCardProps) => {
  // row 1
  const reference = application?.data?.application?.reference;
  const address = getPropertyAddress(
    application?.submission?.data?.property?.address,
  );
  const boundary_geojson =
    application?.submission?.data?.property?.boundary?.site;

  const description = getDescription(application?.submission?.data?.proposal);

  // the rest of the fields
  const applicationStatusSummary = application?.applicationStatusSummary;
  const applicationDecisionSummary = application?.applicationDecisionSummary;

  const applicationAppealDecisionSummary = findItemByKey<DprContentPage>(
    contentDecisions(),
    application?.data?.appeal?.decision?.replaceAll("_", "-") ?? "",
  )?.title;
  const councilDecisionDate = getCouncilDecisionDate(application);

  return (
    <article
      aria-labelledby={`application-information-section-${reference}`}
      className={`dpr-application-card${boundary_geojson ? "" : " dpr-application-card--no-map"}`}
    >
      <InfoIcon
        href={`/${councilSlug}/help`}
        title="Get help understanding what everything here means"
        ariaLabel="Get help understanding what everything here means"
        className="dpr-info-icon"
      />
      <div className="dpr-application-card__head govuk-grid-row">
        {reference && (
          <div className="govuk-grid-column-one-third-from-desktop">
            <dl>
              <dt className="govuk-heading-s">Application reference</dt>
              <dd
                className="govuk-body"
                id={`application-information-section-${reference}`}
              >
                {reference}
              </dd>
            </dl>
          </div>
        )}

        {address && (
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <dl>
              <dt className="govuk-heading-s">Address</dt>
              <dd className="govuk-body">{address}</dd>
            </dl>
          </div>
        )}
      </div>

      {(boundary_geojson || description) && (
        <div className="dpr-application-card__map-data">
          {boundary_geojson && (
            <div className="dpr-application-card__map">
              <ApplicationMapLoader
                reference={reference}
                mapData={boundary_geojson}
                description={`Map showing the boundaries for application reference ${reference}`}
                mapType="application-search"
              />
            </div>
          )}

          {description && (
            <div className="dpr-application-card__data">
              <dl>
                <dt className="govuk-heading-s">Description</dt>
                <dd>
                  <p className="govuk-body">
                    {splitStringOnOrBeforeMaxChars(description, 500).summary}
                    {splitStringOnOrBeforeMaxChars(description, 500)
                      .continued && (
                      <>
                        &hellip;<em>(continued)</em>
                      </>
                    )}
                  </p>
                </dd>
              </dl>
            </div>
          )}
        </div>
      )}

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <dl className="dpr-application-card__fields">
            {application.applicationType && (
              <ApplicationDataField
                title="Application type"
                value={getPrimaryApplicationType(application.applicationType)}
              />
            )}

            {applicationStatusSummary && (
              <ApplicationDataField
                title="Status"
                value={applicationStatusSummary}
              />
            )}

            {application?.data?.validation?.receivedAt && (
              <ApplicationDataField
                title="Received date"
                value={
                  <time dateTime={application?.data?.validation?.receivedAt}>
                    {formatDateTimeToDprDate(
                      application?.data?.validation?.receivedAt,
                    )}
                  </time>
                }
              />
            )}
            {application?.data?.validation?.validatedAt && (
              <ApplicationDataField
                title="Valid from date"
                value={
                  <time dateTime={application?.data?.validation?.validatedAt}>
                    {formatDateTimeToDprDate(
                      application?.data?.validation?.validatedAt,
                    )}
                  </time>
                }
              />
            )}
            {application?.data?.application?.publishedAt && (
              <ApplicationDataField
                title="Published date"
                value={
                  <time dateTime={application.data.application.publishedAt}>
                    {formatDateTimeToDprDate(
                      application.data.application.publishedAt,
                    )}
                  </time>
                }
              />
            )}
            {application?.data?.consultation?.endDate && (
              <ApplicationDataField
                title="Consultation end date"
                value={formatDateToDprDate(
                  application?.data?.consultation?.endDate,
                )}
              />
            )}

            {getCouncilDecision(application) && (
              <>
                {councilDecisionDate && (
                  <ApplicationDataField
                    title="Council decision date"
                    value={formatDateTimeToDprDate(councilDecisionDate)}
                  />
                )}

                <ApplicationDataField
                  title="Council decision"
                  value={applicationDecisionSummary}
                />
              </>
            )}
            {application?.data?.appeal?.decision && (
              <>
                {application?.data?.appeal?.decisionDate && (
                  <ApplicationDataField
                    title="Appeal decision date"
                    value={
                      <time dateTime={application.data.appeal.decisionDate}>
                        {formatDateToDprDate(
                          application.data.appeal.decisionDate,
                        )}
                      </time>
                    }
                  />
                )}

                <ApplicationDataField
                  title="Appeal decision"
                  value={applicationAppealDecisionSummary}
                />
              </>
            )}
          </dl>
        </div>
      </div>

      {reference && (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <Button
              element="link"
              href={`/${councilSlug}/${reference}`}
              variant="information"
            >
              View details of {reference}
            </Button>
          </div>
        </div>
      )}
    </article>
  );
};
