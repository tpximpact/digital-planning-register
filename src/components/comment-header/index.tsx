/* eslint-disable react/no-unescaped-entities */
import React from "react";
import dynamic from "next/dynamic";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { DprBoundaryGeojson } from "@/types";

// Dynamically import the Map component with SSR disabled
const DynamicMap = dynamic(() => import("../map"), {
  ssr: false,
  loading: () => <div className="map-placeholder">Loading map...</div>,
});

interface CommentHeaderProps {
  boundary_geojson?: DprBoundaryGeojson;
  site?: { address_1: string; postcode: string };
  reference: string;
  council: string;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  boundary_geojson,
  site,
  reference,
  council,
}) => {
  const getGeometryData = React.useMemo(() => {
    if (!boundary_geojson) return null;

    let geometryType;
    let coordinates;

    if (boundary_geojson.type === "Feature") {
      geometryType = boundary_geojson.geometry?.type;
      coordinates = boundary_geojson.geometry?.coordinates;
    } else if (boundary_geojson.type === "FeatureCollection") {
      const features = boundary_geojson.features;
      if (features && features.length > 0) {
        geometryType = features[0].geometry?.type;
        coordinates = features[0].geometry?.coordinates;
      }
    }

    if (!geometryType || !coordinates) return null;

    return {
      type: "Feature",
      geometry: {
        type: geometryType,
        coordinates,
      },
    };
  }, [boundary_geojson]);

  return (
    <div className="comment-header">
      <h1 className="govuk-heading-l">Tell us what you think</h1>

      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third app-map">
          {getGeometryData && (
            <DynamicMap
              geojsonData={JSON.stringify(getGeometryData)}
              staticMode={true}
              zoom={10}
              page="static-map-page"
            />
          )}
        </div>
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-heading-m">
            {site?.address_1}, {site?.postcode}
          </h2>
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body">{reference}</p>
          <p className="govuk-body">
            Your feedback helps us improve developments so they meet the needs
            of people in {capitaliseWord(council)}. It's important you let us
            know what you think.
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CommentHeader);
