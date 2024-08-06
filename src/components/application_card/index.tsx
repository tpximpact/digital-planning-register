import { DprBoundaryGeojson } from "@/types";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { definedDecision } from "../../../util/formatDecision";
import { definedStatus } from "../../../util/formatStatus";
import DescriptionCard from "../description_card";
import LandingMap from "../landing_map";
import { format } from "date-fns";

export interface ApplicationCardProps {
  council: string;
  reference: string;
  address: string;
  boundary_geojson: DprBoundaryGeojson;
  description: string;
  applicationType: string;
  applicationStatus: string;
  consultationEndDate: string | null;
  applicationReceivedDate: string;
  applicationPublishedAt: string | null | undefined;
  applicationDeterminedAt: string | null | undefined;
  applicationDecision: string | null | undefined;
}

const ApplicationCard = ({
  council,
  reference,
  address,
  boundary_geojson,
  description,
  applicationType,
  applicationStatus,
  consultationEndDate,
  applicationReceivedDate,
  applicationPublishedAt,
  applicationDeterminedAt,
  applicationDecision,
}: ApplicationCardProps) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin search-card">
      <div className="govuk-grid-column-full">
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
            <div className="govuk-grid-column-one-third landing-map">
              <LandingMap boundary_geojson={boundary_geojson} />
            </div>
          )}
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-heading-s">Description</h2>
            <DescriptionCard description={description} />
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <div className="govuk-heading-s">Application type</div>
            <p className="govuk-body">
              {applicationType &&
                capitaliseWord(applicationType.replace(/_/g, " "))}
            </p>
          </div>

          <div className="govuk-grid-column-one-third">
            {applicationStatus && consultationEndDate && (
              <>
                <h2 className="govuk-heading-s">Status</h2>
                <p className="govuk-body">
                  {definedStatus(applicationStatus, consultationEndDate)}
                </p>
              </>
            )}
          </div>

          <div className="govuk-grid-column-one-third">
            {applicationReceivedDate && (
              <>
                <h2 className="govuk-heading-s">Received date</h2>
                <p className="govuk-body">
                  {applicationReceivedDate &&
                    `${format(
                      new Date(applicationReceivedDate),
                      "dd MMM yyyy",
                    )}`}
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
                  {applicationPublishedAt &&
                    `${format(
                      new Date(applicationPublishedAt),
                      "dd MMM yyyy",
                    )}`}
                </p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {consultationEndDate && (
              <>
                <div className="govuk-heading-s">Consultation End Date</div>
                <p className="govuk-body">
                  {consultationEndDate &&
                    `${format(new Date(consultationEndDate), "dd MMM yyyy")}`}
                </p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {applicationDeterminedAt && applicationDecision && (
              <>
                <div className="govuk-heading-s">Decision Date</div>
                <p className="govuk-body">
                  {applicationDeterminedAt &&
                    `${format(
                      new Date(applicationDeterminedAt),
                      "dd MMM yyyy",
                    )}`}
                </p>
              </>
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            {applicationDeterminedAt && applicationDecision && (
              <>
                <div className="govuk-heading-s">Decision</div>
                <p className="govuk-body">
                  {applicationDeterminedAt &&
                    definedDecision(applicationDecision, applicationType)}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <a
              href={`/${council}/${reference}`}
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
