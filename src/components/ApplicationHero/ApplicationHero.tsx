import "./ApplicationHero.scss";
import { DprPlanningApplication } from "@/types";
import { InfoIcon } from "../InfoIcon";
import {
  contentApplicationStatuses,
  getApplicationStatusSummary,
  getDocumentedApplicationType,
  getPrimaryApplicationType,
  getApplicationStatusSummarySentiment,
  getApplicationDecisionSummary,
  getApplicationDecisionSummarySentiment,
  contentApplicationDecisions,
} from "@/lib/planningApplication";
import { flattenObject, formatDprDate, slugify } from "@/util";
import { Tag } from "../Tag";
import { ApplicationDataField } from "../ApplicationDataField";
import { ApplicationMapLoader } from "../ApplicationMap";

interface ApplicationHeroProps {
  councilSlug: string;
  application: DprPlanningApplication;
}

export const ApplicationHero = ({
  councilSlug,
  application,
}: ApplicationHeroProps) => {
  // row 1
  const reference = application.application?.reference;
  const address = application.property?.address?.singleLine;
  const boundary_geojson = application.property?.boundary?.site;

  // the rest of the fields
  const applicationStatusSummary =
    application.application?.status &&
    getApplicationStatusSummary(
      application.application.status,
      application.application.consultation.endDate ?? undefined,
    );
  const documentedApplicationStatuses = flattenObject(
    contentApplicationStatuses,
    "title",
  );

  const applicationDecisionSummary = getApplicationDecisionSummary(
    application.applicationType,
    application.application?.decision ?? undefined,
  );

  const documentedApplicationDecisions = flattenObject(
    contentApplicationDecisions,
    "title",
  );

  return (
    <section
      aria-labelledby={`application-information-section-${reference}`}
      className={`dpr-application-hero${boundary_geojson ? "" : " dpr-application-hero--no-map"}`}
      id="key-information"
    >
      <div className="govuk-grid-row">
        {boundary_geojson && (
          <div className="dpr-application-hero__map">
            <ApplicationMapLoader
              reference={reference}
              mapData={boundary_geojson}
              description="Interactive map showing the location of the application"
              mapType="application-show"
              // mapType="context-setter"
            />
          </div>
        )}
        <div className="dpr-application-hero__data">
          <dl className="dpr-application-hero__fields">
            {address && (
              <ApplicationDataField title="Address" value={address} />
            )}
            {application?.applicationType && (
              <ApplicationDataField
                title="Application type"
                value={getPrimaryApplicationType(application.applicationType)}
                infoIcon={
                  getDocumentedApplicationType(application.applicationType) ? (
                    <InfoIcon
                      href={`/${councilSlug}/planning-process#${slugify(getDocumentedApplicationType(application.applicationType) ?? "")}`}
                      title="Understanding application types"
                      ariaLabel="Understanding application types"
                    />
                  ) : undefined
                }
              />
            )}
            {applicationStatusSummary && (
              <ApplicationDataField
                title="Status"
                value={
                  <Tag
                    label={applicationStatusSummary}
                    sentiment={getApplicationStatusSummarySentiment(
                      applicationStatusSummary,
                    )}
                    id="application-status"
                    isInline={true}
                  />
                }
                infoIcon={
                  applicationStatusSummary &&
                  documentedApplicationStatuses.includes(
                    applicationStatusSummary,
                  ) ? (
                    <InfoIcon
                      href={`/${councilSlug}/planning-process#${slugify(applicationStatusSummary)}`}
                      title="Understanding application statuses"
                      ariaLabel="Understanding application statuses"
                    />
                  ) : undefined
                }
              />
            )}
            {application.application?.receivedAt && (
              <ApplicationDataField
                title="Recieved date"
                value={formatDprDate(application.application.receivedAt)}
                infoIcon={
                  <InfoIcon
                    href={`/${councilSlug}/planning-process#${slugify("Received date")}`}
                    title="Understanding dates"
                    ariaLabel="Understanding dates"
                  />
                }
              />
            )}
            {application.application?.validAt && (
              <ApplicationDataField
                title="Valid from date"
                value={formatDprDate(application.application.validAt)}
                infoIcon={
                  <InfoIcon
                    href={`/${councilSlug}/planning-process#${slugify("Valid from date")}`}
                    title="Understanding dates"
                    ariaLabel="Understanding dates"
                  />
                }
              />
            )}
            {application.application?.publishedAt && (
              <ApplicationDataField
                title="Published date"
                value={formatDprDate(application.application.publishedAt)}
                infoIcon={
                  <InfoIcon
                    href={`/${councilSlug}/planning-process#${slugify("Published date")}`}
                    title="Understanding dates"
                    ariaLabel="Understanding dates"
                  />
                }
              />
            )}
            {application.application?.consultation?.endDate && (
              <ApplicationDataField
                title="Consultation end date"
                value={formatDprDate(
                  application.application.consultation.endDate,
                )}
                infoIcon={
                  <InfoIcon
                    href={`/${councilSlug}/planning-process#${slugify("Consultation end date")}`}
                    title="Understanding consultation end date"
                    ariaLabel="Understanding consultation end date"
                  />
                }
              />
            )}

            {application.application?.decision && (
              <>
                {application.application.determinedAt && (
                  <ApplicationDataField
                    title="Decision Date"
                    value={formatDprDate(application.application.determinedAt)}
                    infoIcon={
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#${slugify("Decision date")}`}
                        title="Understanding dates"
                        ariaLabel="Understanding dates"
                      />
                    }
                  />
                )}

                <ApplicationDataField
                  title="Decision"
                  value={
                    applicationDecisionSummary && (
                      <Tag
                        label={applicationDecisionSummary}
                        sentiment={getApplicationDecisionSummarySentiment(
                          applicationDecisionSummary,
                        )}
                        isInline={true}
                      />
                    )
                  }
                  infoIcon={
                    applicationDecisionSummary &&
                    documentedApplicationDecisions.includes(
                      applicationDecisionSummary,
                    ) ? (
                      <InfoIcon
                        href={`/${councilSlug}/planning-process#${slugify(applicationDecisionSummary)}`}
                        title="Understanding decisions"
                        ariaLabel="Understanding decisions"
                      />
                    ) : undefined
                  }
                />
              </>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
};
