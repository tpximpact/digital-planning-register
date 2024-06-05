import Map from "../map";
const LandingMap = ({ boundary_geojson }: any) => {
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
      {geometryType && coordinates && (
        <Map
          page="landing"
          geojsonData={JSON.stringify({
            type: "Feature",
            geometry: {
              type: geometryType,
              coordinates: coordinates,
            },
          })}
        />
      )}
    </>
  );
};

export default LandingMap;
