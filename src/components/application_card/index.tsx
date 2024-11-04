import { DprPlanningApplication } from "@/types";
import DescriptionCard from "../description_card";
import { formatDprDate } from "@/util";
import {
  definedStatus,
  definedDecision,
  formatApplicationType,
} from "@/lib/applications";
import ApplicationMap from "../application_map";

export interface ApplicationCardProps extends DprPlanningApplication {
  councilSlug: string;
}

const ApplicationCard = ({
  councilSlug,
  application,
  property,
  proposal,
}: ApplicationCardProps) => {
  const reference = application?.reference;
  const address = property?.address.singleLine;
  const boundary_geojson = property?.boundary.site;
  const description = proposal?.description;
  const applicationType = application?.type.description;
  const applicationStatusDefined = definedStatus(
    application?.status,
    application?.consultation.endDate,
  );
  const applicationReceivedAt = application?.receivedAt;
  const applicationPublishedAt = application?.publishedAt;
  const consultationEndDate = application?.consultation.endDate;
  const applicationDecision = application?.decision;
  const applicationDeterminedAt = application?.determinedAt;

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
            <h2 className="govuk-heading-s">Application Reference</h2>
            <p className="govuk-body">{reference}</p>
          </div>
          <div className="govuk-grid-column-two-thirds">
            <h3 className="govuk-heading-s">Address</h3>
            <p className="govuk-body">{address}</p>
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
            <h3 className="govuk-heading-s">Description</h3>
            <DescriptionCard description={description} />
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            {applicationType && (
              <>
                <h3 className="govuk-heading-s">Application Type</h3>
                <p className="govuk-body">
                  {formatApplicationType(applicationType)}
                </p>
              </>
            )}
          </div>

          <div className="govuk-grid-column-one-third">
            {applicationStatusDefined && (
              <>
                <h3 className="govuk-heading-s">Status</h3>
                <p className="govuk-body">{applicationStatusDefined}</p>
              </>
            )}
          </div>

          <div className="govuk-grid-column-one-third">
            {applicationReceivedAt && (
              <>
                <h3 className="govuk-heading-s">Received Date</h3>
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
                <h3 className="govuk-heading-s">Published Date</h3>
                <p className="govuk-body">
                  {formatDprDate(applicationPublishedAt)}
                </p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {consultationEndDate && (
              <>
                <h3 className="govuk-heading-s">Consultation End Date</h3>
                <p className="govuk-body">
                  {formatDprDate(consultationEndDate)}
                </p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {decisionDate && (
              <>
                <h3 className="govuk-heading-s">Decision Date</h3>
                <p className="govuk-body">{decisionDate}</p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {decisionDefined && (
              <>
                <h3 className="govuk-heading-s">Decision</h3>
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
