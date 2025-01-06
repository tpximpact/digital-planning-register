import { DprBoundaryGeojson } from "@/types";

export interface mapTypeProps {
  showScale: boolean;
  zoom: number;
  geojsonbuffer: number;
  staticMode?: boolean;
  hideResetControl?: boolean;
}

/**
 * Work out the settings for each map type
 * @param mapType
 * @returns
 */
export const determineMapTypeProps = (mapType?: string) => {
  let mapTypeProps: mapTypeProps;
  let classModifier;
  let staticMode;
  switch (mapType) {
    case "context-setter":
      classModifier = "context-setter";
      staticMode = true;
      mapTypeProps = {
        showScale: false,
        zoom: 24,
        geojsonbuffer: 12,
      };
      break;
    case "application-search":
      classModifier = "application-search";
      staticMode = true;
      mapTypeProps = {
        showScale: true,
        zoom: 24,
        geojsonbuffer: 12,
      };
      break;
    case "application-show":
      classModifier = "application-show";
      staticMode = false;
      mapTypeProps = {
        showScale: true,
        zoom: 24,
        geojsonbuffer: 12,
      };
      break;
    default:
      classModifier = "default";
      staticMode = false;
      mapTypeProps = {
        showScale: true,
        zoom: 14,
        geojsonbuffer: 82,
      };
      break;
  }
  return { staticMode, classModifier, mapTypeProps };
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
