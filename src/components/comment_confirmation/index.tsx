/* eslint-disable react/no-unescaped-entities */
import Map from "../map";
import { BoundaryGeojson } from "../../../util/type";
import { capitaliseWord } from "../../../util/capitaliseWord";

const CommentConfirmation = ({
  reference,
  council,
  site,
  boundary_geojson,
}: {
  reference: string;
  council: string;
  site?: { address_1: string; postcode: string };
  boundary_geojson?: BoundaryGeojson;
}) => {
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
      <div className="govuk-panel govuk-panel--confirmation">
        <h1 className="govuk-panel__title">Comment submitted</h1>
      </div>
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
            {" "}
            {site?.address_1}, {site?.postcode}{" "}
          </h2>
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body">{reference}</p>
          <p className="govuk-body">
            Your feedback helps us improve developments so they meet the needs
            of people in {council ? capitaliseWord(council) : "your council."}.
            It's important you let us know what you think.
          </p>
        </div>
      </div>
      <h2 className="govuk-heading-m">
        Discover other planning applications in your area
      </h2>
      <p className="govuk-body">
        If you're interested in learning more about planning applications in
        your area, you can view all currently active applications and provide
        comments on them.
      </p>
      <form action={`/${council}`} method="GET">
        <button
          type="submit"
          role="button"
          className="govuk-button govuk-button--secondary button-extra-right-margin"
          data-module="govuk-button"
        >
          Back to application search
        </button>
      </form>
    </>
  );
};

export default CommentConfirmation;
