import { formatDprDate } from "../../../util/formatDates";
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
import { ApplicationCardProps } from "../application_card";
import Link from "next/link";
import ApplicationMap from "../application_map";

interface ApplicationInformationProps extends ApplicationCardProps {}

const ApplicationInformation = ({
  council,
  application,
  property,
  proposal,
}: ApplicationInformationProps) => {
  const reference = application.reference;
  const address = property.address.singleLine;

  const boundary_geojson = property.boundary.site;
  const applicationType = application.type.description;
  const applicationStatus = application.status;
  const applicationStatusDefined = definedStatus(
    application.status,
    application.consultation.endDate,
  );
  const applicationReceivedAt = application.receivedAt;
  const applicationValidAt = application.validAt;
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

  const description = proposal.description;

  return (
    <div>
      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third-from-desktop">
          <div className="govuk-heading-s">Application Reference</div>
          <p className="govuk-body" id="application-reference">
            {reference}
          </p>
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop">
          <div className="govuk-heading-s">Address</div>
          <p className="govuk-body">{address}</p>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third app-map">
          {boundary_geojson && <ApplicationMap mapData={boundary_geojson} />}
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop key-info">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              {applicationType && (
                <>
                  <div className="govuk-heading-s">
                    Application Type
                    <a
                      className="info-icon"
                      href={`/${council}/planning-process#${applicationTypesInfoPointId(applicationType)}`}
                      title="Understanding application types"
                      aria-label="Understanding application types"
                      target="_blank"
                    >
                      i
                    </a>
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
                  <div className="govuk-heading-s">
                    Status
                    <a
                      className="info-icon"
                      href={`/${council}/planning-process#${applicationStatusesInfoPointId(applicationStatusDefined)}`}
                      title="Understanding application statuses"
                      aria-label="Understanding application statuses"
                      target="_blank"
                    >
                      i
                    </a>
                  </div>
                  <p
                    className={`govuk-body ${definedStatusClass(applicationStatusDefined)}`}
                    id="application-status"
                    style={{ maxWidth: "fit-content", padding: "2px 10px" }}
                  >
                    {applicationStatusDefined}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <div className="govuk-heading-s">
                Received Date
                <a
                  className="info-icon"
                  href={`/${council}/planning-process#received-date`}
                  title="Understanding dates"
                  aria-label="Understanding dates"
                  target="_blank"
                >
                  i
                </a>
              </div>
              <p className="govuk-body">
                {/* NB in application card we dont display recieved at if one isn't set */}
                {applicationReceivedAt
                  ? formatDprDate(applicationReceivedAt)
                  : "Date not available"}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              {applicationValidAt && (
                <>
                  <div className="govuk-heading-s">
                    Valid From Date{" "}
                    <a
                      className="info-icon"
                      href={`/${council}/planning-process#validated-date`}
                      title="Understanding dates"
                      target="_blank"
                    >
                      i
                    </a>
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
                  <div className="govuk-heading-s">
                    Published Date{" "}
                    <a
                      className="info-icon"
                      href={`/${council}/planning-process#published-date`}
                      title="Understanding dates"
                      target="_blank"
                    >
                      i
                    </a>
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
                  <div className="govuk-heading-s">
                    Consultation End Date{" "}
                    <a
                      className="info-icon"
                      href={`/${council}/planning-process#consultation-end-date`}
                      title="Understanding consultation end date"
                      target="_blank"
                    >
                      i
                    </a>
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
                  <div className="govuk-heading-s">
                    Decision Date{" "}
                    <a
                      className="info-icon"
                      href={`/${council}/planning-process#decision-date`}
                      title="Understanding dates"
                      aria-label="Understanding dates"
                      target="_blank"
                    >
                      i
                    </a>
                  </div>
                  <p className="govuk-body">{decisionDate}</p>
                </>
              )}
            </div>

            <div className="govuk-grid-column-one-half">
              {decisionDefined && (
                <>
                  <div className="govuk-heading-s">
                    Decision{" "}
                    <a
                      className="info-icon"
                      href={`/${council}/planning-process#${applicationDecisionInfoPointId(decisionDefined)}`}
                      title="Understanding decisions"
                      aria-label="Understanding decisions"
                      target="_blank"
                    >
                      i
                    </a>
                  </div>
                  <p
                    className={`govuk-body ${definedDecisionClass(decisionDefined)}`}
                    style={{ maxWidth: "fit-content", padding: "2px 10px" }}
                  >
                    {decisionDefined}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="govuk-heading-l">Description</div>
      <p className="govuk-body" id="application-description">
        {description}
      </p>
      {applicationStatus !== "determined" && (
        <div className="govuk-grid-row extra-top-margin">
          <div className="govuk-grid-column-full">
            <Link
              href={`/${council}/${reference}/submit-comment`}
              className="govuk-button govuk-button--primary"
              data-module="govuk-button"
            >
              Comment on this application
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationInformation;
