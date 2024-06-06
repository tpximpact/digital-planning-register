import { Data } from "../../../util/type";
import Map from "../map";
import { format } from "date-fns";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { definedDecision } from "../../..//util/formatDecision";

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
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body" role="application-reference">
            {reference}
          </p>
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h2 className="govuk-heading-s">Address</h2>
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
              <h2 className="govuk-heading-s">Application Type</h2>
              <p className="govuk-body" role="application-type">
                {capitaliseWord(application_type?.replace(/_/g, " ") as string)}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Status</h2>

              <p
                className="govuk-tag--blue govuk-body"
                role="application-status"
                style={{ maxWidth: "fit-content", padding: "2px 10px" }}
              >
                {capitaliseWord(status?.replace(/_/g, " ") as string)}
              </p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Received date</h2>
              <p className="govuk-body">
                {received_date
                  ? format(new Date(received_date as string), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>
            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Consultation end date</h2>
              <p className="govuk-body">
                {consultation?.end_date
                  ? format(new Date(consultation?.end_date), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>

            {/* <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Valid from date</h2>
              <p className="govuk-body">
                {in_assessment_at
                  ? format(new Date(in_assessment_at), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div> */}
          </div>

          <div className="govuk-grid-row">
            {/* <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Published date</h2>
              <p className="govuk-body">
                {received_date
                  ? format(new Date(received_date as string), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div> */}

            {/* <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Consultation end date</h2>
              <p className="govuk-body">
                {consultation?.end_date
                  ? format(new Date(consultation?.end_date), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div> */}
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Decision Date</h2>
              <p className="govuk-body">
                {determination_date && decision
                  ? format(new Date(determination_date), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Decision</h2>

              {decision && determination_date && (
                <p
                  className="govuk-tag--yellow govuk-body"
                  style={{ maxWidth: "fit-content", padding: "2px 10px" }}
                >
                  {definedDecision(decision, application_type as string)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="govuk-heading-l">Description</h2>
      <p className="govuk-body" role="application-description">
        {description}
      </p>
    </div>
  );
};

export default ApplicationInformation;
