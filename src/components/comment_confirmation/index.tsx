import Map from "../map";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { DprBoundaryGeojson } from "@/types";

interface CommentConfirmationProps {
  reference: string;
  council: string;
  address?: string;
  boundary_geojson?: DprBoundaryGeojson;
  navigateToPage: (page: number, params?: object) => void;
}

const CommentConfirmation = ({
  reference,
  council,
  address,
  boundary_geojson,
  navigateToPage,
}: CommentConfirmationProps) => {
  const boundaryGeojson = boundary_geojson;

  let geometryType;
  let coordinates;

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
          <h2 className="govuk-heading-m">{address}</h2>
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body">{reference}</p>
          <p className="govuk-body">
            Your feedback helps us improve developments so they meet the needs
            of people in {council ? capitaliseWord(council) : "your council."}.
            It&apos;s important you let us know what you think.
          </p>
        </div>
      </div>
      <h2 className="govuk-heading-m">
        Discover other planning applications in your area
      </h2>
      <p className="govuk-body">
        If you&apos;re interested in learning more about planning applications
        in your area, you can view all currently active applications and provide
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
