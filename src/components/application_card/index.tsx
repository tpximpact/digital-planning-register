import { DprApplication } from "@/types";
import DescriptionCard from "../description_card";
import { formatDprDate } from "@/util";
import {
  definedStatus,
  definedDecision,
  formatApplicationType,
} from "@/lib/applications";
import ApplicationMap, {
  ApplicationMapLoader,
  ApplicationMapLoaderDelay,
} from "../ApplicationMap";

export interface ApplicationCardProps extends DprApplication {
  councilSlug: string;
}

const ApplicationCard = ({
  councilSlug,
  application,
  property,
  proposal,
}: ApplicationCardProps) => {
  const reference = application.reference;
  const address = property.address.singleLine;
  const boundary_geojson = property.boundary.site;
  const description = proposal.description;
  const applicationType = application.type.description;
  const applicationStatusDefined = definedStatus(
    application.status,
    application.consultation.endDate,
  );
  const applicationReceivedAt = application.receivedAt;
  const applicationPublishedAt = application.publishedAt;
  const consultationEndDate = application.consultation.endDate;
  const applicationDecision = application.decision;
  const applicationDeterminedAt = application.determinedAt;

  const decisionDate =
    applicationDecision && applicationDeterminedAt
      ? formatDprDate(applicationDeterminedAt)
      : undefined;

  const decisionDefined =
    applicationDecision && applicationDeterminedAt
      ? definedDecision(applicationDecision, applicationType)
      : undefined;

  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin search-card">
      <div className="govuk-grid-column-full">
        {/* row 1 - reference and address */}
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <div className="govuk-heading-s">Application Reference</div>
            <p className="govuk-body">{reference}</p>
          </div>
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-heading-s">Address</div>
            <p className="govuk-body">{address}</p>
          </div>
        </div>

        <div className="govuk-grid-row">
          {boundary_geojson && (
            <div className="govuk-grid-column-one-third">
              <ApplicationMapLoaderDelay
                reference={reference}
                mapData={boundary_geojson}
                description=""
                mapType="application-search"
              />
            </div>
          )}
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-heading-s">Description</h2>
            <DescriptionCard description={description} />
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            {applicationType && (
              <>
                <div className="govuk-heading-s">Application Type</div>
                <p className="govuk-body">
                  {formatApplicationType(applicationType)}
                </p>
              </>
            )}
          </div>

          <div className="govuk-grid-column-one-third">
            {applicationStatusDefined && (
              <>
                <h2 className="govuk-heading-s">Status</h2>
                <p className="govuk-body">{applicationStatusDefined}</p>
              </>
            )}
          </div>

          <div className="govuk-grid-column-one-third">
            {applicationReceivedAt && (
              <>
                <h2 className="govuk-heading-s">Received Date</h2>
                <p className="govuk-body">
                  {formatDprDate(applicationReceivedAt)}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            {applicationPublishedAt && (
              <>
                <div className="govuk-heading-s">Published Date</div>
                <p className="govuk-body">
                  {formatDprDate(applicationPublishedAt)}
                </p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {consultationEndDate && (
              <>
                <div className="govuk-heading-s">Consultation End Date</div>
                <p className="govuk-body">
                  {formatDprDate(consultationEndDate)}
                </p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {decisionDate && (
              <>
                <div className="govuk-heading-s">Decision Date</div>
                <p className="govuk-body">{decisionDate}</p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {decisionDefined && (
              <>
                <div className="govuk-heading-s">Decision</div>
                <p className="govuk-body">{decisionDefined}</p>
              </>
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
    </div>
  );
};

export default ApplicationCard;
