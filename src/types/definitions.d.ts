/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * This file contains the definitions for common data models used accross the application
 * Anything that is specific to BOPS or other API sources should be defined in the handlers
 *
 * DprApplication - the most important object, contains all the information about a planning application
 * DprDocument - a file or document associated with a planning application
 * DprComment - a comment on a planning application
 * DprBoundaryGeojson - the messy data bit that describes the boundary of a planning application
 */

import { Appeal } from "@/types/odp-types/schemas/prototypeApplication/data/Appeal";
import { ApplicationType } from "@/types/odp-types/schemas/prototypeApplication/enums/ApplicationType.ts";
import { GeoBoundary } from "@/types/odp-types/shared/Boundaries";
import { PostSubmissionApplication } from "@/types/odp-types/schemas/postSubmissionApplication/index";
import { DprStatusSummary, DprDecisionSummary } from "@/types";
import { CommentSentiment } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentSentiment";
import { CommentTopic } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentTopic";
import { PrototypeApplication } from "./odp-types/schemas/prototypeApplication";

/**
 *
 *
 *
 * DprApplication
 * the most important object, contains all the information about a planning application
 *
 * NB this will need to be changes to PublishedApplication when the redacted version is made
 * NB this currently excludes a lot of the submission data as DPR isn't using it and BOPS isn't
 * currently providing it all in a valid format
 *
 *
 */
export type DprApplication = Omit<
  PostSubmissionApplication,
  "data" | "submission" | "comments"
> & {
  data: Omit<PostSubmissionApplication["data"], "appeal"> & {
    appeal?: PostSubmissionApplication["data"]["appeal"] & {
      files?: DprDocument[];
    };
  };
  comments?: {
    public?: {
      comments?: DprComment[];
    };
    specialist?: {
      comments?: DprComment[];
    };
  };
  submission: {
    data: {
      applicant: PrototypeApplication["data"]["applicant"];
      property: Pick<
        PrototypeApplication["data"]["property"],
        "address" | "boundary"
      >;
      proposal: PrototypeApplication["data"]["proposal"];
    };
  };
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
  data: {
    localPlanningAuthority: {
      commentsAcceptedUntilDecision: boolean;
    };
    appeal?: Appeal & {
      files?: DprDocument[];
    };
  };
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
     */
    expiryDate?: string | null;
    /**
     * 2024-05-30T14:23:21.936Z
     * NB coverting to UTC in the converters
     */
    receivedAt: string;
    /**
     * 2024-05-30T14:23:21.936Z
     * NB coverting to UTC in the converters
     */
    publishedAt?: string | null;
    /**
     * 2024-05-30T14:23:21.936Z
     * NB coverting to UTC in the converters
     */
    validAt: string | null;
    /**
     * 2024-05-30T14:23:21.936Z
     * NB coverting to UTC in the converters
     */
    determinedAt?: string | null;
    decision?: string | null;
  };
  property: Pick<
    PostSubmissionApplication["data"]["property"],
    "address" | "boundary"
  >;
  proposal: PostSubmissionApplication["data"]["proposal"];
  applicant: PostSubmissionApplication["data"]["applicant"];
  officer: PostSubmissionApplication["data"]["caseOfficer"];
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
 * DprCommentSubmission
 * What comments look like when they are submitted
 *
 *
 *
 */
export type DprCommentSubmission = {
  name: string;
  address: string;
  email?: string;
  // telephone?: string;
  response: string;
  summary_tag: CommentSentiment;
  tags: CommentTopic[];
};

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
