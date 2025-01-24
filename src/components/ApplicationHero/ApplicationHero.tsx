import "./ApplicationHero.scss";
import { DprPlanningApplication } from "@/types";
import { InfoIcon } from "../InfoIcon";
import {
  getApplicationStatusSummary,
  getDocumentedApplicationType,
  getPrimaryApplicationType,
  getApplicationStatusSummarySentiment,
  getApplicationDecisionSummary,
  getApplicationDecisionSummarySentiment,
  contentDecisions,
  contentApplicationStatuses,
} from "@/lib/planningApplication";
import { flattenObject, slugify } from "@/util";
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
    contentApplicationStatuses(),
    "title",
  );

  const applicationDecisionSummary = getApplicationDecisionSummary(
    application.applicationType,
    application.application?.decision ?? undefined,
  );

  const documentedApplicationDecisions = flattenObject(
    contentDecisions(),
    "title",
  );

  return (
    <section
      className={`dpr-application-hero${boundary_geojson ? "" : " dpr-application-hero--no-map"}`}
      id="key-information"
    >
      <div className="dpr-application-hero__map-data">
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

            {/* Status */}
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
                      href={`/${councilSlug}/help/application-statuses#${slugify(applicationStatusSummary)}`}
                      title="Understanding application statuses"
                      ariaLabel="Understanding application statuses"
                    />
                  ) : undefined
                }
              />
            )}

            {/* application type */}
            {application?.applicationType && (
              <ApplicationDataField
                title="Application type"
                value={getPrimaryApplicationType(application.applicationType)}
                infoIcon={
                  getDocumentedApplicationType(application.applicationType) ? (
                    <InfoIcon
                      href={`/${councilSlug}/help/application-types#${slugify(getDocumentedApplicationType(application.applicationType) ?? "")}`}
                      title="Understanding application types"
                      ariaLabel="Understanding application types"
                    />
                  ) : undefined
                }
              />
            )}

            {/* decision */}
            {application.application?.decision && (
              <>
                <ApplicationDataField
                  title="Council decision"
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
                        href={`/${councilSlug}/help/decisions#${slugify(applicationDecisionSummary)}`}
                        title="Understanding decisions"
                        ariaLabel="Understanding decisions"
                      />
                    ) : undefined
                  }
                  // @TODO don't make this full width if there are appeals info afterwards
                  // isFull={isThereANextItemInTheList ? false : true}
                />
              </>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
};
