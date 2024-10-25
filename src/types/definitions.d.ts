/**
 * This file contains the definitions for common models used accross the application
 * Anything that is specific to BOPS or other API sources should be defined in the handlers
 *
 * DprApplication - the most important object, contains all the information about a planning application
 * DprDocument - a file or document associated with a planning application
 * DprComment - a comment on a planning application
 * DprBoundaryGeojson - the messy data bit that describes the boundary of a planning application
 */

/**
 * DprApplication
 * Every component and object in this app expects the Applications to be in this format
 * Data from API's is converted to this format by handlers
 * This is the most important object in the app!
 *
 * It should be compliant with the ODP and MHCLG API schemas
 * @todo add in schema validation for this object
 *
 * NB Currently some fields are only available in BOPS and not in ODP schema
 * @todo find a way to identify BOPS only and non schema fields
 */
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
      site: DprBoundaryGeojson;
    };
  };
  proposal: {
    description: string;
  };
}

/**
 * What do files/documents look like to our application
 * NB this also needs to be ODP compliant
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

/**
 * What our comments look like
 * specialist = consultee
 * public = published
 */
export type DprCommentTypes = "specialist" | "public";
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
 * DprBoundaryGeojson
 * This is our custom definition for the boundary geojson object but its identical to the BOPS one...
 * @todo refine this formate further to be more generic
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
