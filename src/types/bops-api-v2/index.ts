/**
 * What the endpoint from BOPS looks like
 * ${process.env[councilApi]}planning_applications
 */

interface Metadata {
  results: number;
  total_results: number;
  page: number;
  from: number;
  to: number;
  total_pages: number;
}

export interface NonStandardComment {
  comment: string;
  received_at: string;
  summary_tag?: string;
}

export interface NonStandardDocument {
  url: string;
  /**
   * Optional because of the need to insert fake application form document
   */
  created_at?: string;
  tags: string[];
  numbers: string;
  applicant_description: string | null;

  /**
   * @warning This field is only used by the 'fake' document for application form
   */
  metadata?: {
    contentType: string;
  };
}

export type NonStandardBoundaryGeojson =
  | {
      type: "FeatureCollection";
      features: Array<{
        type: "Feature";
        geometry: {
          type: "Polygon" | "MultiPolygon";
          coordinates: number[][][] | number[][][][];
        };
        properties?: any | null;
      }>;
    }
  | {
      type: "Feature";
      geometry: {
        type: "Polygon" | "MultiPolygon";
        coordinates: number[][][] | number[][][][];
      };
      properties?: any;
    };

export interface NonStandardApplication {
  agent_first_name: string;
  agent_last_name: string;
  agent_phone: string;
  agent_email: string;
  applicant_first_name: string;
  applicant_last_name: string;
  user_role: string;
  awaiting_determination_at: string | null;
  to_be_reviewed_at: string | null;
  created_at: string;
  description: string;
  determined_at: string | null;
  determination_date: string;
  id: number;
  invalidated_at: string | null;
  in_assessment_at: string | null;
  payment_reference: string;
  payment_amount: string;
  result_flag: string;
  result_heading: string;
  result_description: string;
  result_override: string;
  returned_at: string | null;
  started_at: string | null;
  status: string;
  target_date: string;
  withdrawn_at: string | null;
  work_status: string;
  boundary_geojson: NonStandardBoundaryGeojson;
  assigned_user_name: string;
  assigned_user_role: string;
  application_type: string;
  reference: string;
  reference_in_full: string;
  site: {
    address_1: string;
    address_2: string;
    county: string;
    town: string;
    postcode: string;
    uprn: string;
    latitude: string;
    longitude: string;
  };
  received_date: string;
  validAt: string;
  publishedAt?: string | null;
  constraints: string[];
  documents: NonStandardDocument[];
  published_comments: NonStandardComment[];
  consultee_comments: NonStandardComment[];
  consultation: {
    end_date: string | null;
  };
  make_public: boolean;

  /**
   * @deprecated ApplicationInformation component wants this field but it doesn't exist in the main API
   * @todo Remove this field from the ApplicationInformation componentor find out if its needed
   */
  decision: string;
}

interface ApplicationOverview {
  type: {
    value: string;
    description: string;
  };
  reference: string;
  fullReference: string;
  targetDate?: string | null;
  receivedAt: string;
  validAt: string | null;
  publishedAt?: string | null;
  determinedAt?: string | null;
  status: string;
  decision?: string | null;
  consultation: {
    startDate: string | null;
    endDate: string | null;
    publicUrl?: string | null;
    publishedComments?: {
      comment: string;
      receivedAt: string;
      summaryTag: string;
    }[];
    consulteeComments?: {
      comment: string;
      receivedAt: string;
    }[];
  };
}

/**
 * GET /api/v2/planning_applications
 */
export interface V2PlanningApplications {
  metadata: Metadata;
  data: NonStandardApplication[];
}

/**
 * GET /api/v2/planning_applications/search
 */
export interface V2PlanningApplicationsSearch {
  metadata: Metadata;
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  data: [
    {
      application: ApplicationOverview;
      property: {
        address: {
          latitude: number;
          longitude: number;
          title: string;
          singleLine: string;
          uprn: string;
          town: string;
          postcode: string;
        };
        boundary: {
          site: NonStandardBoundaryGeojson;
        };
      };
      proposal: {
        description: string;
      };
    },
  ];
}

/**
 * GET /api/v2/planning_applications/{reference}
 */
export interface V2PlanningApplicationsReference
  extends NonStandardApplication {}
