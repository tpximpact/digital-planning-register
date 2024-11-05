import { formatDprDate } from "@/util";
import {
  definedStatus,
  definedDecision,
  definedStatusClass,
  formatApplicationType,
  applicationTypesInfoPointId,
  applicationStatusesInfoPointId,
  applicationDecisionInfoPointId,
  definedDecisionClass,
} from "@/lib/applications";
import "./ApplicationDetailsInformation.scss";

import Link from "next/link";
import ApplicationMap from "../application_map";
import { DprPlanningApplication } from "@/types";
import { InfoIcon } from "../InfoIcon";
import { ApplicationDecisionLabel } from "../ApplicationDecisionLabel";

interface ApplicationDetailsInformationProps {
  councilSlug: string;
  application: DprPlanningApplication;
}

export const ApplicationDetailsInformation = ({
  councilSlug,
  application,
}: ApplicationDetailsInformationProps) => {
  const reference = application.application.reference;
  const address = application.property.address.singleLine;

  const boundary_geojson = application.property.boundary.site;
  const applicationType = application.application.type.description;
  const applicationStatus = application.application.status;
  const applicationStatusDefined = definedStatus(
    application.application.status,
    application.application.consultation.endDate,
  );
  const applicationReceivedAt = application.application.receivedAt;
  const applicationValidAt = application.application.validAt;
  const applicationPublishedAt = application.application.publishedAt;
  const consultationEndDate = application.application.consultation.endDate;
  const applicationDecision = application.application.decision;
  const applicationDeterminedAt = application.application.determinedAt;
  const decisionDate =
    applicationDecision && applicationDeterminedAt
      ? formatDprDate(applicationDeterminedAt)
      : undefined;
  const decisionDefined =
    applicationDecision && applicationDeterminedAt
      ? definedDecision(applicationDecision, applicationType)
      : undefined;

  const description = application.proposal.description;

  return (
    <section aria-labelledby="application-information-section">
      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third-from-desktop">
          <h1 className="govuk-heading-s" id="application-information-section">
            Application Reference
          </h1>
          <p className="govuk-body" id="application-reference">
            {reference}
          </p>
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h2 className="govuk-heading-s">Address</h2>
          <p className="govuk-body">{address}</p>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third app-map">
          {boundary_geojson && (
            <ApplicationMap reference={reference} mapData={boundary_geojson} />
          )}
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop key-info">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              {applicationType && (
                <>
                  <div className="dpr-application-details__heading">
                    <h2 className="govuk-heading-s">
                      Application Type
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#${applicationTypesInfoPointId(applicationType)}`}
                        title="Understanding application types"
                        ariaLabel="Understanding application types"
                      />
                    </h2>
                  </div>
                  <p className="govuk-body" id="application-type">
                    {formatApplicationType(applicationType)}
                  </p>
                </>
              )}
            </div>

            <div className="govuk-grid-column-one-half">
              {applicationStatusDefined && (
                <>
                  <div className="dpr-application-details__heading">
                    <h2 className="govuk-heading-s">
                      Status
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#${applicationStatusesInfoPointId(applicationStatusDefined)}`}
                        title="Understanding application statuses"
                        ariaLabel="Understanding application statuses"
                      />
                    </h2>
                  </div>
                  <ApplicationDecisionLabel
                    label={applicationStatusDefined}
                    decision={definedStatusClass(applicationStatusDefined)}
                    id="application-status"
                    isInline={true}
                  />
                </>
              )}
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <div className="dpr-application-details__heading">
                <h2 className="govuk-heading-s">
                  Received Date
                  <InfoIcon
                    href={`/${councilSlug}/planning-process#received-date`}
                    title="Understanding dates"
                    ariaLabel="Understanding dates"
                  />
                </h2>
              </div>
              <p className="govuk-body">
                {applicationReceivedAt
                  ? formatDprDate(applicationReceivedAt)
                  : "Date not available"}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              {applicationValidAt && (
                <>
                  <div className="dpr-application-details__heading">
                    <h2 className="govuk-heading-s">
                      Valid From Date
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#validated-date`}
                        title="Understanding dates"
                        ariaLabel="Understanding dates"
                      />
                    </h2>
                  </div>
                  <p className="govuk-body">
                    {formatDprDate(applicationValidAt)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              {applicationPublishedAt && (
                <>
                  <div className="dpr-application-details__heading">
                    <h2 className="govuk-heading-s">
                      Published Date
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#published-date`}
                        title="Understanding dates"
                        ariaLabel="Understanding dates"
                      />
                    </h2>
                  </div>
                  <p className="govuk-body">
                    {formatDprDate(applicationPublishedAt)}
                  </p>
                </>
              )}
            </div>
            <div className="govuk-grid-column-one-half">
              {consultationEndDate && (
                <>
                  <div className="dpr-application-details__heading">
                    <h2 className="govuk-heading-s">
                      Consultation End Date
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#consultation-end-date`}
                        title="Understanding consultation end date"
                        ariaLabel="Understanding consultation end date"
                      />
                    </h2>
                  </div>
                  <p className="govuk-body">
                    {formatDprDate(consultationEndDate)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              {decisionDate && (
                <>
                  <div className="dpr-application-details__heading">
                    <h2 className="govuk-heading-s">
                      Decision Date
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#decision-date`}
                        title="Understanding dates"
                        ariaLabel="Understanding dates"
                      />
                    </h2>
                  </div>
                  <p className="govuk-body">{decisionDate}</p>
                </>
              )}
            </div>

            <div className="govuk-grid-column-one-half">
              {decisionDefined && (
                <>
                  <div className="dpr-application-details__heading">
                    <h2 className="govuk-heading-s">
                      Decision
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#${applicationDecisionInfoPointId(decisionDefined)}`}
                        title="Understanding decisions"
                        ariaLabel="Understanding decisions"
                      />
                    </h2>
                  </div>
                  <ApplicationDecisionLabel
                    label={decisionDefined}
                    decision={definedDecisionClass(decisionDefined)}
                    isInline={true}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <h2 className="govuk-heading-l">Description</h2>
      <p className="govuk-body" id="application-description">
        {description}
      </p>
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
    </section>
  );
};
