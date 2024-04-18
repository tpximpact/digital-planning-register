export type Document = {
  url?: string;
  applicant_description?: string;
  tags?: string[];
  created_at?: string;
  numbers?: string;
};

export type Data = {
  reference?: string;
  site?: { address_1: string; postcode: string };
  description?: string;
  application_type?: string;
  received_date?: string;
  status?: string;
  reference_in_full?: string;
  result_flag?: string;
  consultation?: { end_date: string };
  determination_date?: string;
  agent_first_name?: string;
  agent_last_name?: string;
  applicant_first_name?: string;
  applicant_last_name?: string;
  documents?: Document[];
  boundary_geojson?: BoundaryGeojson;
};

type BoundaryGeojson =
  | {
      type: "Feature";
      geometry: {
        type: "Polygon" | "MultiPolygon";
        coordinates: number[][][] | number[][][][];
      };
      properties?: any;
    }
  | {
      type: "FeatureCollection";
      features: Array<{
        type: "Feature";
        geometry: {
          type: "Polygon" | "MultiPolygon";
          coordinates: number[][][] | number[][][][];
        };
        properties?: any;
      }>;
    };
