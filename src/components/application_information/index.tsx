import { Data } from "../../../util/type";
import Map from "../map";
import { format } from "date-fns";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { definedDecision } from "../../..//util/formatDecision";
import { definedStatus } from "../../../util/formatStatus";

function applicationType(application_type: string) {
  const type: { [key: string]: string } = {
    prior_approval: "prior_approval",
    planning_permission: "planning_permission",
    outline_planning_permission: "outline_planning_permission",
    lawfulness_certificate: "lawfulness_certificate",
  };
  return type[application_type] || "application-types";
}

function statusApplication(status: string) {
  const type: { [key: string]: string } = {
    "Consultation in progress": "consultation-in-progress",
    "Assessment in progress": "assessment-in-progress",
    Determined: "determined",
    Withdrawn: "withdrawn",
  };
  return type[status] || "application-statuses";
}

const ApplicationInformation = ({
  reference,
  application_type,
  site,
  received_date,
  result_flag,
  decision,
  determination_date,
  status,
  consultation,
  boundary_geojson,
  description,
  in_assessment_at,
}: Data) => {
  const boundaryGeojson = boundary_geojson;

  let geometryType: "Polygon" | "MultiPolygon" | undefined;
  let coordinates: number[][][] | number[][][][] | undefined;

  if (boundaryGeojson?.type === "Feature") {
    geometryType = boundaryGeojson.geometry?.type;
    coordinates = boundaryGeojson.geometry?.coordinates;
  } else if (boundaryGeojson?.type === "FeatureCollection") {
    const features = boundaryGeojson.features;
    if (features && features.length > 0) {
      geometryType = features[0].geometry?.type;
      coordinates = features[0].geometry?.coordinates;
    }
  }
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
          <p className="govuk-body">
            {site?.address_1}, {site?.postcode}{" "}
          </p>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third app-map">
          {geometryType && coordinates && (
            <Map
              geojsonData={JSON.stringify({
                type: "Feature",
                geometry: {
                  type: geometryType,
                  coordinates,
                },
              })}
            />
          )}
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop key-info">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <div className="govuk-heading-s">
                Application Type
                <a
                  className="info-icon"
                  href={`/camden/planning-process#${applicationType(application_type as string)}`}
                  title="Understanding application types"
                  target="_blank"
                >
                  i
                </a>
              </div>
              <p className="govuk-body" id="application-type">
                {capitaliseWord(application_type?.replace(/_/g, " ") as string)}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              <div className="govuk-heading-s">
                Status
                <a
                  className="info-icon"
                  href={`/camden/planning-process#${statusApplication(
                    definedStatus(
                      status as string,
                      consultation?.end_date as string,
                    ),
                  )}`}
                  title="Understanding application statuses"
                  target="_blank"
                >
                  i
                </a>
              </div>

              <p
                className="govuk-tag--blue govuk-body"
                id="application-status"
                style={{ maxWidth: "fit-content", padding: "2px 10px" }}
              >
                {definedStatus(
                  status as string,
                  consultation?.end_date as string,
                )}
              </p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <div className="govuk-heading-s">
                Received date
                <a
                  className="info-icon"
                  href="/camden/planning-process#received-date"
                  title="Understanding dates"
                  target="_blank"
                >
                  i
                </a>
              </div>
              <p className="govuk-body">
                {received_date
                  ? format(new Date(received_date as string), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              {consultation?.end_date && (
                <>
                  <div className="govuk-heading-s">
                    Consultation end date{" "}
                    <a
                      className="info-icon"
                      href="/camden/planning-process#consultation-end-date"
                      title="Understanding dates"
                      target="_blank"
                    >
                      i
                    </a>
                  </div>
                  <p className="govuk-body">
                    {format(new Date(consultation?.end_date), "dd MMM yyyy")}
                  </p>
                </>
              )}
            </div>

            {/* <div className="govuk-grid-column-one-half">
      <div className="govuk-heading-s">Valid from date <a class="info-icon" href="/camden/planning-process#validated-dates" title="Understanding dates" target="_blank">i</a></div>
      <p className="govuk-body">
        {in_assessment_at
          ? format(new Date(in_assessment_at), "dd MMM yyyy")
          : "Date not available"}
      </p>
    </div> */}
          </div>

          <div className="govuk-grid-row">
            {/* <div className="govuk-grid-column-one-half">
      <div className="govuk-heading-s">Published date <a class="info-icon" href="/camden/planning-process#published-date" title="Understanding dates" target="_blank">i</a></div>
      <p className="govuk-body">
        {received_date
          ? format(new Date(received_date as string), "dd MMM yyyy")
          : "Date not available"}
      </p>
    </div> */}

            {/* <div className="govuk-grid-column-one-half">
      <div className="govuk-heading-s">Consultation end date</div>
      <p className="govuk-body">
        {consultation?.end_date
          ? format(new Date(consultation?.end_date), "dd MMM yyyy")
          : "Date not available"}
      </p>
    </div> */}
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              {determination_date && decision && (
                <>
                  <div className="govuk-heading-s">
                    Decision Date{" "}
                    <a
                      className="info-icon"
                      href="/camden/planning-process#decision-date"
                      title="Understanding dates"
                      target="_blank"
                    >
                      i
                    </a>
                  </div>
                  <p className="govuk-body">
                    {format(new Date(determination_date), "dd MMM yyyy")}
                  </p>
                </>
              )}
            </div>

            <div className="govuk-grid-column-one-half">
              {decision && determination_date && (
                <>
                  <div className="govuk-heading-s">
                    Decision{" "}
                    <a
                      className="info-icon"
                      href={`/camden/planning-process#${definedDecision(
                        decision,
                        application_type as string,
                      )
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      title="Understanding decisions"
                      target="_blank"
                    >
                      i
                    </a>
                  </div>
                  <p
                    className="govuk-tag--yellow govuk-body"
                    style={{ maxWidth: "fit-content", padding: "2px 10px" }}
                  >
                    {definedDecision(decision, application_type as string)}
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
    </div>
  );
};

export default ApplicationInformation;
