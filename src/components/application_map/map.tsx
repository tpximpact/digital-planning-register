"use client";
import { DprBoundaryGeojson } from "@/types";
import { useState, useEffect } from "react";

export interface ApplicationMapMapProps {
  mapData: DprBoundaryGeojson;
  staticMap?: boolean;
  zoom?: number;
}

interface DefaultMapProps {
  hideResetControl: boolean;
  geojsonColor: string;
  geojsonBuffer: string;
  osVectorTilesApiKey: string;
  "aria-label": string;
  osCopyright: string;
  zoom: number;
  showScale: boolean;
  staticMode?: boolean;
}

/**
 * Map is shown in two forms:
 * Interactive
 * Static
 *
 *
 * Listings page - static
 * Details page - interactive
 * Comment header - static
 * Comment submitted - interactive
 *
 *
 * There are two types of map geojson - "Feature" and "FeatureCollection"
 *
 * https://github.com/theopensystemslab/map/blob/main/src/components/my-map/index.ts
 *
 * @param param0
 * @returns
 */
const ApplicationMapMap = ({
  mapData,
  staticMap = false,
  zoom,
}: ApplicationMapMapProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("@opensystemslab/map");
  }, []);

  let defaultMapProps: DefaultMapProps = {
    hideResetControl: true,
    geojsonColor: "#ff0000",
    geojsonBuffer: "85",
    osVectorTilesApiKey: "",
    "aria-label": "An interactive map",
    osCopyright: "© Crown copyright and database rights 2024 OS (0)100024857",
    zoom: zoom ?? 14,
    showScale: true,
  };

  if (staticMap === true) {
    defaultMapProps = { staticMode: true, ...defaultMapProps };
  }

  const geojsonData =
    !mapData?.type ||
    (mapData?.type !== "Feature" && mapData?.type !== "FeatureCollection")
      ? false
      : JSON.stringify(mapData);

  if (isClient) {
    if (geojsonData) {
      return (
        <div role="region" aria-label="map" className="osl-map">
          <my-map
            role="application"
            geojsonData={geojsonData}
            {...defaultMapProps}
          />
        </div>
      );
    } else {
      return null;
    }
  }
};

/**
 * Converts a GeoJSON object to a stringified GeoJSON Feature object.
 * @deprecated This function is not used in the current codebase.
 *
 * @param {DprBoundaryGeojson} geojson - The GeoJSON object to convert.
 * @returns {string | null} The stringified GeoJSON Feature object, or null if the input is invalid.
 */
const convertGeoJsonData = (geojson: DprBoundaryGeojson) => {
  if (!geojson) {
    return null;
  }
  const geoJsonDataType = geojson?.type;
  if (
    !geoJsonDataType ||
    (geoJsonDataType !== "Feature" && geoJsonDataType !== "FeatureCollection")
  ) {
    return null;
  }

  let geometryType;
  let coordinates;

  if (geoJsonDataType === "FeatureCollection") {
    const features = geojson.features;
    if (features && features.length > 0) {
      geometryType = features[0].geometry?.type;
      coordinates = features[0].geometry?.coordinates;
    }
  } else {
    geometryType = geojson.geometry?.type;
    coordinates = geojson.geometry?.coordinates;
  }

  return JSON.stringify({
    type: "Feature",
    geometry: {
      type: geometryType,
      coordinates: coordinates,
    },
  });
};

export default ApplicationMapMap;
