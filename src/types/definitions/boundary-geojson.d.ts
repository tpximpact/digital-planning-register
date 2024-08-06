/**
 * This is our custom definition for the boundary geojson object but its identical to the BOPS one...
 */
export interface DprBoundaryGeojson {
  type: "FeatureCollection" | "Feature";
  geometry?: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
  properties?: { [key: string]: any } | null;
  features?: {
    type: string;
    geometry: {
      type: "Polygon" | "MultiPolygon";
      coordinates: number[][][] | number[][][][];
    };
    properties: { [key: string]: any } | null;
  }[];
}
