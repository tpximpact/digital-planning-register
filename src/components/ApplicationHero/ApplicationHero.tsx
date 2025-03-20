/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import "./ApplicationHero.scss";
import { DprApplication, DprContentPage } from "@/types";
import { InfoIcon } from "../InfoIcon";
import {
  getDocumentedApplicationType,
  getPrimaryApplicationType,
  getApplicationStatusSummarySentiment,
  getApplicationDecisionSummarySentiment,
  contentDecisions,
  contentApplicationStatuses,
} from "@/lib/planningApplication";
import { findItemByKey, flattenObject, slugify } from "@/util";
import { Tag } from "../Tag";
import { ApplicationDataField } from "../ApplicationDataField";
import { ApplicationMapLoader } from "../ApplicationMap";
import { appealDecisionSentiment } from "@/lib/planningApplication/appeal";
import { getPropertyAddress } from "@/lib/planningApplication/application";

interface ApplicationHeroProps {
  councilSlug: string;
  application: DprApplication;
}

export const ApplicationHero = ({
  councilSlug,
  application,
}: ApplicationHeroProps) => {
  // row 1
  const reference = application?.data?.application?.reference;
  const address = getPropertyAddress(
    application?.submission?.data?.property?.address,
  );
  const boundary_geojson =
    application?.submission?.data?.property?.boundary?.site;

  const applicationStatusSummary = application?.applicationStatusSummary;
  const applicationDecisionSummary = application?.applicationDecisionSummary;

  const documentedApplicationStatuses = flattenObject(
    contentApplicationStatuses(),
    "title",
  );

  const documentedApplicationDecisions = flattenObject(
    contentDecisions(),
    "title",
  );

  const applicationAppealDecisionSummary = findItemByKey<DprContentPage>(
    contentDecisions(),
    application?.data?.appeal?.decision?.replaceAll("_", "-") ?? "",
  )?.title;

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
            {application?.data?.assessment?.planningOfficerDecision && (
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
                        title="Understanding council decisions"
                        ariaLabel="Understanding council decisions"
                      />
                    ) : undefined
                  }
                  isFull={
                    application?.data?.assessment?.planningOfficerDecision
                      ? false
                      : true
                  }
                />
              </>
            )}

            {/* Appeal decision */}
            {application?.data?.appeal?.decision && (
              <ApplicationDataField
                title="Appeal decision"
                value={
                  applicationAppealDecisionSummary && (
                    <Tag
                      label={applicationAppealDecisionSummary}
                      isInline={true}
                      {...(applicationAppealDecisionSummary &&
                      appealDecisionSentiment[applicationAppealDecisionSummary]
                        ? {
                            sentiment:
                              appealDecisionSentiment[
                                applicationAppealDecisionSummary
                              ],
                          }
                        : {})}
                    />
                  )
                }
                infoIcon={
                  applicationAppealDecisionSummary &&
                  documentedApplicationDecisions.includes(
                    applicationAppealDecisionSummary,
                  ) ? (
                    <InfoIcon
                      href={`/${councilSlug}/help/decisions#${slugify(applicationAppealDecisionSummary)}`}
                      title="Understanding appeal decisions"
                      ariaLabel="Understanding appeal decisions"
                    />
                  ) : undefined
                }
              />
            )}
          </dl>
        </div>
      </div>
    </section>
  );
};
