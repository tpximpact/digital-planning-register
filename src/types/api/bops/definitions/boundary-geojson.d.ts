export interface BopsBoundaryGeojson {
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
