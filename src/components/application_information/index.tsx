/* eslint-disable react/no-unescaped-entities */
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
import Image from "next/image";

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

  const digitalSiteNotice = application.digitalSiteNotice;

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

      {digitalSiteNotice && (
        <>
          <div>
            <h3 className="govuk-heading-m">How the site will be used</h3>
            <div className="govuk-body">
              <ul>
                {/* This needs to be shown dynamically with the proposed land use classes mapped to human readable names */}
                <li>Residential</li>
                <li>Commercial</li>
              </ul>
            </div>
            {digitalSiteNotice.height && (
              <>
                <h3 className="govuk-heading-m">Height</h3>
                <p className="govuk-body">
                  Maximum {digitalSiteNotice.height} storey
                </p>
              </>
            )}
            {digitalSiteNotice.constructionTime && (
              <>
                <h3 className="govuk-heading-m">Estimated construction time</h3>
                <p className="govuk-body">
                  {digitalSiteNotice.constructionTime}
                </p>
              </>
            )}
          </div>
          <section className="govuk-grid-row impact-wrap huge-bottom-margin">
            <div className="govuk-grid-column-full">
              <h1 className="govuk-heading-l">How could this affect you?</h1>
              <p className="govuk-body">
                Any new development in your local area will have an effect on
                your community.
              </p>
              <p className="govuk-body">
                We've outlined some of the ways we think this development would
                impact your community, so that you can give us feedback on
                what's important for us to consider when we're deciding what to
                give planning permission for.
              </p>
              <div className="impact-info">
                {digitalSiteNotice?.showHousing && (
                  <div className="impact-item-container">
                    <div className="wrap-impact-item">
                      <h2 className="govuk-heading-m">New homes</h2>
                      <Image
                        src="/images/icon-homes.png"
                        alt="job"
                        width={64}
                        height={64}
                      />{" "}
                    </div>
                    <p className="govuk-body large-margin-top">
                      <span className="govuk-!-font-weight-bold">
                        {" "}
                        {digitalSiteNotice?.housing?.residentialUnits}
                      </span>{" "}
                      new homes
                    </p>
                    <p className="govuk-body">
                      <span className="govuk-!-font-weight-bold">
                        {digitalSiteNotice?.housing?.affordableResidentialUnits}
                      </span>
                      {"% "}
                      affordable housing
                    </p>
                    <details
                      className="govuk-details undefined"
                      data-module="govuk-details"
                    >
                      <summary className="govuk-details__summary">
                        <span
                          className="govuk-details__summary-text"
                          role="definition"
                        >
                          How did we calculate this?
                        </span>
                      </summary>
                      <div className="govuk-details__text">
                        <p className="govuk-body">
                          The number of self contained homes that are being
                          proposed. This includes affordable, social and private
                          housing. Larger schemes might have a range showing the
                          minimum and maximum number of homes if the total
                          number is going to be decided later.
                        </p>
                        <p className="govuk-body">
                          Affordable housing is a term used to cover different
                          types of housing that are less costly than housing on
                          the private market. This might be social rented
                          housing, affordable rented housing or housing which
                          the government helps people to buy a proportion of. It
                          can be shown as a proportion of the total number of
                          homes, or as a proportion of the total residential
                          floorspace.
                        </p>
                      </div>
                    </details>
                  </div>
                )}{" "}
                {digitalSiteNotice?.showOpenSpace && (
                  <div className="impact-item-container">
                    <div className="wrap-impact-item">
                      <h2 className="govuk-heading-m">Open spaces</h2>
                      <Image
                        src="/images/icon-open-spaces.png"
                        alt="job"
                        width={64}
                        height={64}
                      />{" "}
                    </div>
                    <p className="govuk-body large-margin-top">
                      {digitalSiteNotice?.openSpaceArea} square meters
                    </p>
                    <details
                      className="govuk-details undefined"
                      data-module="govuk-details"
                    >
                      <summary className="govuk-details__summary">
                        <span
                          className="govuk-details__summary-text"
                          role="definition"
                        >
                          How did we calculate this?
                        </span>
                      </summary>
                      <div className="govuk-details__text">
                        <p className="govuk-body">
                          Open space includes land and areas of water (such as
                          rivers and canals) which can be used for sport,
                          recreation and relaxation. Applicants calculate the
                          amount of open space, but it's checked by council
                          planners when assessing the application.
                        </p>
                      </div>
                    </details>
                  </div>
                )}
                {digitalSiteNotice?.showJobs && (
                  <div className="impact-item-container">
                    <div className="wrap-impact-item">
                      <h2 className="govuk-heading-m">New jobs</h2>
                      <Image
                        src="/images/icon-office.png"
                        alt="job"
                        width={64}
                        height={64}
                      />
                    </div>
                    <p className="govuk-body large-margin-top">
                      <span className="govuk-!-font-weight-bold">
                        {digitalSiteNotice?.jobs?.min}
                      </span>{" "}
                      -{" "}
                      <span className="govuk-!-font-weight-bold">
                        {digitalSiteNotice?.jobs?.max}
                      </span>{" "}
                      new roles
                    </p>
                    <details
                      className="govuk-details undefined"
                      data-module="govuk-details"
                    >
                      <summary className="govuk-details__summary">
                        <span
                          className="govuk-details__summary-text"
                          role="definition"
                        >
                          How did we calculate this?
                        </span>
                      </summary>
                      <div className="govuk-details__text">
                        <p className="govuk-body">
                          The council estimates how many new jobs a new
                          development will produce based on the size and type of
                          development. This estimate is based on the Employment
                          Density Guide (3rd addition) produced by Homes &amp;
                          Community Agency (2015). A summary of this guide is
                          published as part of the Camden Planning Guidance for
                          Employment sites and business premises (Appendix 1).
                        </p>
                      </div>
                    </details>
                  </div>
                )}
                {digitalSiteNotice.showCarbon && (
                  <div className="impact-item-container">
                    <div className="wrap-impact-item">
                      <h2 className="govuk-heading-m">Carbon emissions</h2>
                      <Image
                        src="/images/icon-co2.png"
                        alt="carbon"
                        width={64}
                        height={64}
                      />
                    </div>
                    <p className="govuk-body large-margin-top">
                      <span className="govuk-!-font-weight-bold">
                        {digitalSiteNotice.carbonEmissions}%
                      </span>{" "}
                      less than minimum requirements
                    </p>
                    <details
                      className="govuk-details undefined"
                      data-module="govuk-details"
                    >
                      <summary className="govuk-details__summary">
                        <span
                          className="govuk-details__summary-text"
                          role="definition"
                        >
                          How did we calculate this?
                        </span>
                      </summary>
                      <div className="govuk-details__text">
                        <p className="govuk-body">
                          Building regulations set the amount of carbon
                          emissions a development can generate once it is in
                          use. This shows how far below the legal requirements
                          the proposal is.
                        </p>
                      </div>
                    </details>
                  </div>
                )}
                {digitalSiteNotice.showAccess && (
                  <div className="impact-item-container">
                    <div className="wrap-impact-item">
                      <h2 className="govuk-heading-m">
                        Pedestrian and vehicle access
                      </h2>
                      <Image
                        src="/images/icon-crossing.png"
                        alt="access"
                        width={64}
                        height={48}
                      />
                    </div>
                    <p className="govuk-body large-margin-top">
                      {digitalSiteNotice.access}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ApplicationInformation;
