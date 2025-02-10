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
import { PostSubmissionApplication } from "@/types/odp-types/schemas/postSubmissionApplication/index";
import { GeoBoundary } from "@/types/odp-types/shared/Boundaries";

/**
 * Utility to change fields (omit certain fields and replace with modified ones)
 * @internal
 */
type ChangeFields<T, R> = Omit<T, keyof R> & R;

/**
 *
 *
 *
 * DprApplication
 * the most important object, contains all the information about a planning application
 *
 * This is PostSubmissionApplication with only the extra information we need from the submission object
 * @todo this doesn't exclude email address etc yet
 *
 *
 */
type DprApplicant = DprBaseApplicant | DprAgent;

type DprContactDetails = {
  name: {
    title?: string;
    first: string;
    last: string;
  };
  company?: {
    name: string;
  };
};

type DprBaseApplicant = DprContactDetails & {
  type: "individual" | "company" | "charity" | "public" | "parishCouncil";
  address: UserAddress;
};

interface DprAgent extends DprBaseApplicant {
  agent: DprContactDetails & { address: Address };
}

export type DprApplication = ChangeFields<
  PostSubmissionApplication,
  {
    submission: ChangeFields<
      Pick<PostSubmissionApplication["submission"], "files">,
      {
        data: {
          property: Pick<
            PostSubmissionApplication["submission"]["data"]["property"],
            "address" | "boundary"
          >;
          proposal: Pick<
            PostSubmissionApplication["submission"]["data"]["proposal"],
            "description"
          >;
          applicant: DprApplicant;
        };
        files: DprDocument[];
      }
    >;
  }
>;

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
    status: string;
    consultation: {
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
