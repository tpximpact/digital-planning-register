import { DprPlanningApplication } from "@/types";
import { DescriptionCard } from "../DescriptionCard";
import { formatDprDate } from "@/util";
import {
  definedStatus,
  definedDecision,
  formatApplicationType,
} from "@/lib/applications";
import ApplicationMap from "../application_map";
import "./ApplicationCard.scss";

export interface ApplicationCardProps {
  councilSlug: string;
  application: DprPlanningApplication;
}

export const ApplicationCard = ({
  councilSlug,
  application,
}: ApplicationCardProps) => {
  const reference = application.application?.reference;
  const address = application.property?.address.singleLine;
  const boundary_geojson = application.property?.boundary.site;
  const description = application.proposal?.description;
  const applicationType = application.application?.type.description;
  const applicationStatusDefined = definedStatus(
    application.application?.status,
    application.application?.consultation.endDate,
  );
  const applicationReceivedAt = application.application?.receivedAt;
  const applicationPublishedAt = application.application?.publishedAt;
  const consultationEndDate = application.application?.consultation.endDate;
  const applicationDecision = application.application?.decision;
  const applicationDeterminedAt = application.application?.determinedAt;

  const decisionDate =
    applicationDecision && applicationDeterminedAt
      ? formatDprDate(applicationDeterminedAt)
      : undefined;

  const decisionDefined =
    applicationDecision && applicationDeterminedAt
      ? definedDecision(applicationDecision, applicationType)
      : undefined;

  return (
    <article className="govuk-grid-row grid-row-extra-bottom-margin search-card">
      <div className="govuk-grid-column-full">
        {/* row 1 - reference and address */}
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <p className="govuk-heading-s">Application Reference</p>
            <h3 className="govuk-body">{reference}</h3>
          </div>
          <div className="govuk-grid-column-two-thirds">
            <dl>
              <dt className="govuk-heading-s">Address</dt>
              <dd className="govuk-body">{address}</dd>
            </dl>
          </div>
        </div>

        <div className="govuk-grid-row">
          {boundary_geojson && (
            <div className="govuk-grid-column-one-third">
              <ApplicationMap
                reference={reference}
                staticMap={true}
                mapData={boundary_geojson}
              />
            </div>
          )}
          <div className="govuk-grid-column-two-thirds">
            <dl>
              <dt className="govuk-heading-s">Description</dt>
              <dd>
                <DescriptionCard description={description} />
              </dd>
            </dl>
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            {applicationType && (
              <dl>
                <dt className="govuk-heading-s">Application Type</dt>
                <dd className="govuk-body">
                  {formatApplicationType(applicationType)}
                </dd>
              </dl>
            )}
          </div>

          <div className="govuk-grid-column-one-third">
            {applicationStatusDefined && (
              <dl>
                <dt className="govuk-heading-s">Status</dt>
                <dd className="govuk-body">{applicationStatusDefined}</dd>
              </dl>
            )}
          </div>

          <div className="govuk-grid-column-one-third">
            {applicationReceivedAt && (
              <dl>
                <dt className="govuk-heading-s">Received Date</dt>
                <dd className="govuk-body">
                  {formatDprDate(applicationReceivedAt)}
                </dd>
              </dl>
            )}
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            {applicationPublishedAt && (
              <dl>
                <dt className="govuk-heading-s">Published Date</dt>
                <dd className="govuk-body">
                  {formatDprDate(applicationPublishedAt)}
                </dd>
              </dl>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {consultationEndDate && (
              <dl>
                <dt className="govuk-heading-s">Consultation End Date</dt>
                <dd className="govuk-body">
                  {formatDprDate(consultationEndDate)}
                </dd>
              </dl>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {decisionDate && (
              <dl>
                <dt className="govuk-heading-s">Decision Date</dt>
                <dd className="govuk-body">{decisionDate}</dd>
              </dl>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {decisionDefined && (
              <dl>
                <dt className="govuk-heading-s">Decision</dt>
                <dd className="govuk-body">{decisionDefined}</dd>
              </dl>
            )}
          </div>
        </div>

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
      </div>
    </article>
  );
};
