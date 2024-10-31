/**
 * This file contains the definitions for common data models used accross the application
 * Anything that is specific to BOPS or other API sources should be defined in the handlers
 *
 * DprApplication - the most important object, contains all the information about a planning application
 * DprDocument - a file or document associated with a planning application
 * DprComment - a comment on a planning application
 * DprBoundaryGeojson - the messy data bit that describes the boundary of a planning application
 */

/**
 *
 *
 *
 * DprApplication
 * the most important object, contains all the information about a planning application
 *
 *
 *
 */
export interface DprPlanningApplication {
  application: DprPlanningApplicationOverview;
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

export interface DprPlanningApplicationOverview {
  reference: string;
  type: {
    description: string;
  };
  status: string;
  consultation: {
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
  receivedAt: string;
  publishedAt?: string | null;
  determinedAt?: string | null;
  decision?: string | null;
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
}
/**
 *
 *
 *
 * DprDocument
 * What do files/documents look like to our application
 * @todo align with odp
 *
 *
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
 *
 *
 *
 * DprComment
 * What our comments look like
 * specialist = consultee
 * public = published
 *
 *
 *
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
 *
 *
 *
 * DprBoundaryGeojson
 * the messy data bit that describes the boundary of a planning application
 * This is our custom definition for the boundary geojson object but its identical to the BOPS one...
 * @todo refine this formate further to be more generic or inherit from ODP
 *
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
