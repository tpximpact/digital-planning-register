export interface DprApplication {
  application: {
    /**
     * BOPS only atm
     */
    reference: string;
    type: {
      /**
       * BOPS only atm?
       * Used as ApplicationType and is typically
       * planning_permission
       * prior_approval
       * lawfulness_certificate
       * however in ODP this is expanded out to something like:
       * Planning Permission - Full householder
       * which could catch us out
       */
      description: string;
    };
    /**
     * BOPS only atm
     * typically something like
     * not_started
     * determined
     * in_assessment
     */
    status: string;
    consultation: {
      /**
       * BOPS only atm
       * Comes in the format 2024-05-07 but we change to 2023-07-28T00:00:00.000+01:00
       */
      endDate: string | null;
      /**
       * NB: These are only included in BOPS details call not search one
       */
      publishedComments: DprComment[] | null;
      /**
       * NB: These are only included in BOPS details call not search one
       */
      consulteeComments: DprComment[] | null;
    };
    /**
     * 2023-07-28T11:24:14.825+01:00
     */
    receivedAt: string;
    /**
     * 2023-07-28T00:00:00.000+01:00
     */
    publishedAt?: string | null;
    /**
     * 2023-08-01T13:27:30.118+01:00
     */
    determinedAt?: string | null;
    /**
     * refused
     * granted
     * null
     */
    decision?: string | null;
    /**
     * 2023-07-28T00:00:00.000+01:00
     */
    validAt: string | null;

    /**
     * @todo this is missing from the public BOPS response
     */
    id: number;
    /**
     * @todo this is missing from the public BOPS response
     */
    applicant_first_name: string;
    /**
     * @todo this is missing from the public BOPS response
     */
    applicant_last_name: string;
    /**
     * @todo this is missing from the public BOPS response
     */
    agent_first_name: string;
    /**
     * @todo this is missing from the public BOPS response
     */
    agent_last_name: string;

    /**
     * @todo this is missing from the public BOPS response BUT we have a new public endpoint for them
     */
    documents: DprDocument[] | null;
  };
  property: {
    address: {
      singleLine: string;
    };
    boundary: {
      site: {
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
      };
    };
  };
  proposal: {
    description: string;
  };
}

/**
 * What our comments look like
 * A mix of BOPS and DPR
 */
export interface DprDocument {
  url: string;
  title: string;
  /**
   * Optional because of the need to insert fake application form document
   * 2024-07-02T12:30:43.712+01:00
   */
  created_at?: string;
  metadata?: {
    byteSize?: number;
    contentType?: string;
  };
}

// what documents look like in future BOPS endpooints
// {
//   "name": "Proposed Front Elevation.PDF",
//   "url": "https://camden.bops-staging.services/api/v1/planning_applications/2613/documents/9768",
//   "type": [
//     {
//       "value": "elevations.proposed",
//       "description": "Elevations - proposed"
//     }
//   ],
//   "createdAt": "2024-05-02T16:14:54.250+01:00",
//   "applicantDescription": null,
//   "metadata": {
//     "byteSize": 399237,
//     "contentType": "application/pdf"
//   }
// },

// what they currently look like (in BOPS) with the soon to be deprecated endpoint
// {
//   "url": "https://camden.bops-staging.services/api/v1/planning_applications/2613/documents/9768",
//   "created_at": "2024-05-02T16:14:54.250+01:00",
//   "tags": [
//     "elevations.proposed"
//   ],
//   "numbers": "Proposed Front Elevation",
//   "applicant_description": null
// },

/**
 * What our comments look like
 */
export interface DprComment {
  comment: string;
  /**
   * @todo Need to standardise date formats
   * Comes from bops as Tue Feb 20 2024 20:46:30 GMT+0000 (Greenwich Mean Time)
   * we convert to ISO 2024-05-03T00:00:00.000+01:00
   */
  received_at: string;

  /**
   * objection
   * neutral
   * supportive
   */
  sentiment?: string;
}

/**
 * specialist = consultee
 * public = published
 */
export type DprCommentTypes = "specialist" | "public";

export interface SearchParams {
  query?: string;
  /**
   * page number
   */
  page: number;
  resultsPerPage: number;
  /**
   * beginning of advanced search P05
   * also used for comments filtering
   */
  type?: string;
}
