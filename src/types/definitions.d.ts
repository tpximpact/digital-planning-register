/**
 * This file contains the definitions for common data models used accross the application
 * Anything that is specific to BOPS or other API sources should be defined in the handlers
 *
 * DprApplication - the most important object, contains all the information about a planning application
 * DprDocument - a file or document associated with a planning application
 * DprComment - a comment on a planning application
 * DprBoundaryGeojson - the messy data bit that describes the boundary of a planning application
 */

import { Applicant } from "@/types/odp-types/schemas/prototypeApplication/data/Applicant";
import { ApplicationType } from "@/types/odp-types/schemas/prototypeApplication/enums/ApplicationType.ts";
import { GeoBoundary } from "@/types/odp-types/shared/Boundaries";
import { PostSubmissionApplication } from "@/types/odp-types/schemas/postSubmissionApplication/index";
import { DprStatusSummary, DprDecisionSummary } from "@/types";

/**
 *
 *
 *
 * DprApplication
 * the most important object, contains all the information about a planning application
 *
 * NB this will need to be changes to PublishedApplication when the redacted version is made
 * NB this doesn't exclude email address etc yet that will be done through the redacted application submission schema
 *
 *
 */
export type DprApplication = PostSubmissionApplication & {
  applicationStatusSummary: DprStatusSummary;
  applicationDecisionSummary?: DprDecisionSummary;
};

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
  applicationType: ApplicationType;
  application: {
    reference: string;
    status:
      | "Appeal allowed"
      | "Appeal dismissed"
      | "Appeal split decision"
      | "Appeal withdrawn"
      | "Appeal lodged"
      | "Appeal valid"
      | "Appeal started"
      | "Appeal determined"
      | "pending"
      | "not_started"
      | "invalid"
      | "assessment_in_progress"
      | "in_assessment"
      | "awaiting_determination"
      | "in_committee"
      | "to_be_reviewed"
      | "determined"
      | "returned"
      | "withdrawn"
      | "closed";
    consultation: {
      /**
       * YYYY-MM-DD
       */
      startDate: string | null;
      /**
       * YYYY-MM-DD
       */
      endDate: string | null;
      /**
       * proposed new field by us
       * commentingEnabled commentingAllowed allowComments ??
       */
      allowComments?: boolean;
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
     * YYYY-MM-DD
     * NB coverting from receivedAt to receivedDate in the BOPs handlers
     */
    receivedDate: string;
    /**
     * YYYY-MM-DD
     * NB coverting from publishedAt to publishedDate in the BOPs handlers
     */
    publishedDate?: string | null;
    /**
     * YYYY-MM-DD
     * NB coverting from validAt to validDate in the BOPs handlers
     */
    validDate: string | null;
    /**
     * 2024-05-30T14:23:21.936Z
     * NB coverting to UTC in the converters
     */
    determinedAt?: string | null;
    decision?: string | null;
    appeal?: {
      decision?: "allowed" | "dismissed" | "split_decision" | "withdrawn";
      /**
       * YYYY-MM-DD
       * Follows convention of if date in the name it is YYYY-MM-DD
       */
      decisionDate?: string;
      /**
       * YYYY-MM-DD
       * Follows convention of if date in the name it is YYYY-MM-DD
       */
      lodgedDate?: string;
      /**
       * YYYY-MM-DD
       * Follows convention of if date in the name it is YYYY-MM-DD
       */
      startedDate?: string;
      /**
       * YYYY-MM-DD
       * Follows convention of if date in the name it is YYYY-MM-DD
       */
      validatedDate?: string;
      reason?: string;
      documents?: DprDocument[];
    } | null;
  };
  property: {
    address: {
      singleLine: string;
    };
    boundary: {
      site?: DprBoundaryGeojson;
    };
  };
  proposal: {
    description: string;
  };
  applicant: Applicant<any>;
  officer: {
    name: string;
  } | null;
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
   * 2024-05-30T14:23:21.936Z
   * NB coverting to UTC in the converters
   * Optional because of the need to insert fake application form document
   */
  createdDate?: string;
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
   * 2024-05-30T14:23:21.936Z
   * NB coverting to UTC in the converters
   */
  receivedDate: string;
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
export type DprBoundaryGeojson = GeoBoundary["site"];

/**
 *
 *
 *
 * DprPageContent
 * Represents a page content object that works with sidebar and content components
 *
 */
export interface DprContentPage {
  key: string;
  title: string;
  /**
   * A short summary of the content
   */
  summary?: string | JSX.Element;
  content?: JSX.Element;
  /**
   * Items with 'linked' set to true are linked to from the application details page, If this changes we can get rid of the linked field
   */
  linked?: boolean;
  children?: DprPageContent[];
}
