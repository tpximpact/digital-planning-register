import { DprPlanningApplication } from "@/types";
import { DescriptionCard } from "../DescriptionCard";

import ApplicationMap from "../application_map";
import "./ApplicationCard.scss";
import {
  getApplicationDecisionSummary,
  getApplicationStatusSummary,
  getPrimaryApplicationType,
} from "@/lib/planningApplication";
import { ApplicationDataField } from "../ApplicationDataField";
import { formatDprDate } from "@/util";
// import { InfoIcon } from "../InfoIcon";

export interface ApplicationCardProps {
  councilSlug: string;
  application: DprPlanningApplication;
}

export const ApplicationCard = ({
  councilSlug,
  application,
}: ApplicationCardProps) => {
  // row 1
  const reference = application.application?.reference;
  const address = application.property?.address.singleLine;
  const boundary_geojson = application.property?.boundary?.site;

  const description = application.proposal?.description;

  // the rest of the fields
  const applicationStatusSummary =
    application.application?.status &&
    getApplicationStatusSummary(
      application.application.status,
      application.application.consultation?.endDate ?? undefined,
    );

  const applicationDecisionSummary = getApplicationDecisionSummary(
    application.applicationType,
    application.application?.decision ?? undefined,
  );

  return (
    <article
      aria-labelledby={`application-information-section-${reference}`}
      className={`dpr-application-card${boundary_geojson ? "" : " dpr-application-card--no-map"}`}
    >
      {/* uncomment and make sure using dpr-info-icon class when infoicon is styled correctly */}
      {/* <InfoIcon
        href={`/${councilSlug}/planning-process`}
        title="Get help understanding what everything here means"
        ariaLabel="Get help understanding what everything here means"
      /> */}
      <div className="dpr-application-card__head govuk-grid-row">
        {reference && (
          <div className="govuk-grid-column-one-third-from-desktop">
            <p className="govuk-heading-s">Application reference</p>
            <h3
              className="govuk-body"
              id={`application-information-section-${reference}`}
            >
              {reference}
            </h3>
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
        <div className="govuk-grid-row">
          {boundary_geojson && (
            <div className="dpr-application-card__map">
              <ApplicationMap
                reference={reference}
                staticMap={true}
                mapData={boundary_geojson}
              />
            </div>
          )}

          {description && (
            <div className="dpr-application-card__data">
              <dl>
                <dt className="govuk-heading-s">Description</dt>
                <dd>
                  <DescriptionCard description={description} />
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

            {application.application?.receivedAt && (
              <ApplicationDataField
                title="Recieved date"
                value={formatDprDate(application.application.receivedAt)}
              />
            )}
            {application.application?.validAt && (
              <ApplicationDataField
                title="Valid from date"
                value={formatDprDate(application.application.validAt)}
              />
            )}
            {application.application?.publishedAt && (
              <ApplicationDataField
                title="Published date"
                value={formatDprDate(application.application.publishedAt)}
              />
            )}
            {application.application?.consultation?.endDate && (
              <ApplicationDataField
                title="Consultation end date"
                value={formatDprDate(
                  application.application.consultation.endDate,
                )}
              />
            )}

            {application.application?.decision && (
              <>
                {application.application?.determinedAt && (
                  <ApplicationDataField
                    title="Decision Date"
                    value={formatDprDate(application.application.determinedAt)}
                  />
                )}

                <ApplicationDataField
                  title="Decision"
                  value={applicationDecisionSummary}
                />
              </>
            )}
          </dl>
        </div>
      </div>

      {reference && (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <a
              href={`/${councilSlug}/${reference}`}
              className="govuk-button govuk-button--secondary blue-button"
            >
              View details
            </a>
          </div>
        </div>
      )}
    </article>
  );
};
