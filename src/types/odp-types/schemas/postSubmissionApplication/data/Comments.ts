/**
 *
 */

import { DateTime } from "../../../shared/utils";
import { File } from "../../prototypeApplication/File";
import {
  CommentSentiment,
  SpecialistCommentSentiment,
} from "../enums/CommentSentiment";
import { CommentTopic } from "../enums/CommentTopic";

/**
 * @id #PublicComments
 * @description The ordered list of public comments any associated metadata
 */
export type PublicComments = PublicComment[];

export interface PublicComment {
  sentiment: CommentSentiment;
  comment: TopicAndComments[] | string;
  author: CommentAuthor;
  metadata?: CommentMetaData;
}

export interface TopicAndComments {
  topic: CommentTopic;
  /**
   * @todo not sure if we want this in here but it does follow the responses convention?
   */
  question: string;
  comment: string;
}

export interface CommentAuthor {
  name: {
    singleLine: string;
  };
}

/**
 * @todo these will end up depending on the final approval process
 * eg are the comments validated at a different time to when the application is published
 */
export interface CommentMetaData {
  /**
   * When comment was submitted
   */
  submittedAt: DateTime;
  /**
   * When comment was made public
   */
  publishedAt: DateTime;
  /**
   * When comment was validated
   */
  validAt: DateTime;
}

/**
 * @id #SpecialistComments
 * @description The ordered list of specialist comments any associated metadata
 */
export type SpecialistComments = SpecialistComment[];

/**
 * @todo Organisation / Specialism is one or both required?
 * @todo We might want to do different subtypes for different types of specialist
 */
export interface SpecialistCommentAuthor extends CommentAuthor {
  organisation?: string;
  specialism?: string;
  jobTitle?: string;
}

/**
 * @todo is reason/constraint the same thing? is one or both required?
 */
export interface SpecialistComment {
  sentiment: SpecialistCommentSentiment;
  /**
   * @todo I feel like I've seen constaints elsewhere?
   */
  constraint?: {
    name: string;
    url: string;
  };
  reason?: string;
  comment: string;
  author: SpecialistCommentAuthor;
  consultedAt: DateTime;
  /**
   * @todo responded at is different to published at?
   */
  respondedAt: DateTime;
  files?: File[];
  /**
   * @todo nested comments probably needs a better structure no?
   * @todo do these have as much data as the parent?
   */
  responses?: SpecialistComment[];
  metadata?: CommentMetaData;
}
