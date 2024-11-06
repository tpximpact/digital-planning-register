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
import { ApplicationCardProps } from "../application_card";
import Link from "next/link";
import ApplicationMap from "../application_map";

interface ApplicationInformationProps extends ApplicationCardProps {}

const ApplicationInformation = ({
  councilSlug,
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
                  <div className="heading-info-div">
                    <h2
                      className="govuk-heading-s"
                      id="application-type-heading"
                    >
                      Application Type
                    </h2>

                    <a
                      className="info-icon"
                      href={`/${councilSlug}/planning-process#${applicationTypesInfoPointId(applicationType)}`}
                      aria-label="Understanding application types"
                    >
                      <span aria-label="Understanding application types">
                        i
                      </span>
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
                  <div className="heading-info-div">
                    <h2
                      className="govuk-heading-s"
                      id="application-status-heading"
                    >
                      Status
                    </h2>
                    <a
                      className="info-icon"
                      href={`/${councilSlug}/planning-process#${applicationStatusesInfoPointId(applicationStatusDefined)}`}
                      aria-label="Understanding application statuses"
                    >
                      <span aria-label="Understanding application statuses">
                        i
                      </span>
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
              <div className="heading-info-div">
                <h2 className="govuk-heading-s" id="received-date-heading">
                  Received Date
                </h2>
                <a
                  className="info-icon"
                  href={`/${councilSlug}/planning-process#received-date`}
                  aria-label="Understanding dates"
                >
                  <span aria-label="Understanding dates">i</span>
                </a>
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
                  <div className="heading-info-div">
                    <h2 className="govuk-heading-s" id="valid-date-heading">
                      Valid From Date
                    </h2>
                    <a
                      className="info-icon"
                      href={`/${councilSlug}/planning-process#validated-date`}
                      aria-label="Understanding dates"
                    >
                      <span aria-label="Understanding dates">i</span>
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
                  <div className="heading-info-div">
                    <h2 className="govuk-heading-s" id="published-date-heading">
                      Published Date
                    </h2>
                    <a
                      className="info-icon"
                      href={`/${councilSlug}/planning-process#published-date`}
                      aria-label="Understanding dates"
                    >
                      <span aria-label="Understanding dates">i</span>
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
                  <div className="heading-info-div">
                    <h2
                      className="govuk-heading-s"
                      id="consultation-end-heading"
                    >
                      Consultation End Date
                    </h2>
                    <a
                      className="info-icon"
                      href={`/${councilSlug}/planning-process#consultation-end-date`}
                      aria-label="Understanding consultation end date"
                    >
                      <span aria-label="Understanding consultation end date">
                        i
                      </span>
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
                  <div className="heading-info-div">
                    <h2 className="govuk-heading-s" id="decision-date-heading">
                      Decision Date
                    </h2>
                    <a
                      className="info-icon"
                      href={`/${councilSlug}/planning-process#decision-date`}
                      aria-label="Understanding dates"
                    >
                      <span aria-label="Understanding dates">i</span>
                    </a>
                  </div>
                  <p className="govuk-body">{decisionDate}</p>
                </>
              )}
            </div>

            <div className="govuk-grid-column-one-half">
              {decisionDefined && (
                <>
                  <div className="heading-info-div">
                    <h2 className="govuk-heading-s" id="decision-heading">
                      Decision
                    </h2>
                    <a
                      className="info-icon"
                      href={`/${councilSlug}/planning-process#${applicationDecisionInfoPointId(decisionDefined)}`}
                      aria-label="Understanding decisions"
                    >
                      <span aria-label="Understanding decisions">i</span>
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

export default ApplicationInformation;
