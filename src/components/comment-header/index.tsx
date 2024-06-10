/* eslint-disable react/no-unescaped-entities */
import { BoundaryGeojson } from "../../../util/type";
import Map from "../map";

type CommentHeaderType = {
  boundary_geojson?: BoundaryGeojson;
  site?: { address_1: string; postcode: string };
  reference: string;
};
const CommentHeader = ({
  boundary_geojson,
  site,
  reference,
}: CommentHeaderType) => {
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
      <h1 className="govuk-heading-l">Tell us what you think</h1>

      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third">
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
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-heading-m">
            {site?.address_1}, {site?.postcode}{" "}
          </h2>
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body">{reference}</p>
          <p className="govuk-body">
            Your feedback helps us improve developments so they meet the needs
            of people in Camden. It's important you let us know what you think.
          </p>
        </div>
      </div>
    </>
  );
};

export default CommentHeader;
