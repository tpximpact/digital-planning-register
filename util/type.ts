export type ApplicationDocument = {
  url: string;
  applicant_description: string;
  tags: string[];
  created_at: string;
  numbers: string;
};

export type ApplicationComment = {
  comment: string;
  received_at: string;
  summary_tag?: string;
};

export type Data = {
  reference?: string;
  site?: { address_1: string; postcode: string };
  description?: string;
  application_type?: string;
  received_date?: string;
  status?: string;
  result_flag?: string;
  consultation?: { end_date: string };
  decision: string;
  determination_date?: string;
  agent_first_name?: string;
  agent_last_name?: string;
  applicant_first_name?: string;
  applicant_last_name?: string;
  documents?: ApplicationDocument[];
  boundary_geojson?: BoundaryGeojson;
  consultee_comments?: ApplicationComment[];
  published_comments?: ApplicationComment[];
  publishedAt?: string;
  validAt?: string;
  created_at?: string;
  id: number;
};

export type BoundaryGeojson =
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

interface PageContentLinks {
  what_happens_to_your_comments_link?: string;
  contact_planning_advice_link?: string;
  corporate_privacy_statement_link?: string;
  planning_service_privacy_statement_link?: string;
  privacy_policy_link?: string;
}

interface PageContent {
  council_reference_submit_comment_pre_submission?: PageContentLinks;
  council_reference_submit_comment_personal_details?: PageContentLinks;
  council_reference_submit_comment_check_answer?: PageContentLinks;
  privacy_policy?: PageContentLinks;
}

export interface Council {
  name: string;
  contact?: string;
  logo?: string;
  logowhite?: string;
  publicComments?: boolean;
  specialistComments?: boolean;
  pageContent?: PageContent;
}

export interface Config {
  [key: string]: Council;
}
