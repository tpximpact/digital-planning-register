import dynamic from "next/dynamic";
import React from "react";
import { NonStandardBoundaryGeojson } from "@/types";

const DynamicMap = dynamic(() => import("../map"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "28rem", height: "20rem" }}>Loading map...</div>
  ),
});

interface LandingMapProps {
  boundary_geojson: NonStandardBoundaryGeojson;
}

const LandingMap = ({ boundary_geojson }: LandingMapProps) => {
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

  if (!geometryType || !coordinates) {
    return null;
  }

  const geojsonData = JSON.stringify({
    type: "Feature",
    geometry: {
      type: geometryType,
      coordinates: coordinates,
    },
  });

  return (
    <DynamicMap
      staticMode={true}
      page="static-map-page"
      geojsonData={geojsonData}
    />
  );
};

export default LandingMap;
