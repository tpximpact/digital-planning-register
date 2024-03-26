import { Data } from "../../../util/type";
import Map from "../map";
import { format } from "date-fns";

const ApplicationInformation = ({
  reference_in_full,
  application_type,
  site,
  received_date,
  result_flag,
  determination_date,
  status,
  consultation,
  boundary_geojson,
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
    <>
      <div
        className="govuk-grid-row grid-row-extra-bottom-margin"
        style={{ display: "flex" }}
      >
        <div
          className="govuk-grid-column-one-quarter map-container"
          style={{ width: "450px", height: "350px" }}
        >
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

        <div className="govuk-grid-column-three-quarters">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Reference Number</h2>
              <p className="govuk-body" role="application-reference">
                {reference_in_full}
              </p>
            </div>

            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Application Type</h2>
              <p className="govuk-body" role="application-type">
                {application_type?.replace(/_/g, " ")}
              </p>
            </div>

            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Address</h2>
              <p className="govuk-body">
                {site?.address_1}, {site?.postcode}
              </p>
            </div>

            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Date Submitted</h2>
              <p className="govuk-body">
                {received_date
                  ? format(new Date(received_date as string), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Decision</h2>
              {result_flag && (
                <p
                  className="govuk-tag--yellow govuk-body"
                  style={{ maxWidth: "fit-content", padding: "2px 10px" }}
                >
                  {result_flag}
                </p>
              )}
            </div>
            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Status</h2>
              <p
                className="govuk-tag--blue govuk-body"
                role="application-status"
                style={{ maxWidth: "fit-content", padding: "2px 10px" }}
              >
                {status?.replace(/_/g, " ")}
              </p>
            </div>

            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Decision Date</h2>
              <p className="govuk-body">
                {format(new Date(determination_date as string), "dd MMM yyyy")}
              </p>
            </div>
            <div className="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-s">Consultation open until</h2>
              <p className="govuk-body">
                {consultation?.end_date
                  ? format(
                      new Date(consultation?.end_date as string),
                      "dd MMM yyyy",
                    )
                  : "Date not available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="govuk-grid-row  grid-row-extra-bottom-margin">
        <div
          className="govuk-grid-column-full"
          style={{
            maxWidth: "50rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            role="button"
            className="govuk-button govuk-button--secondary button-extra-right-margin"
            data-module="govuk-button"
          >
            View on map
          </a>
          <a
            href="/"
            role="button"
            className="govuk-button govuk-button--secondary button-extra-right-margin"
            data-module="govuk-button"
          >
            View the Digital Site Notice
          </a>
          <a
            href="/"
            role="button"
            className="govuk-button govuk-button--secondary"
            data-module="govuk-button"
          >
            View the submitted application
          </a>
        </div>
      </div>
    </>
  );
};

export default ApplicationInformation;
