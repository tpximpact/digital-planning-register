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
 * Each type in this file represents a schema for a specific type of data returnd by the DPR "API".
 * search
 * show
 * documents
 * applicationSubmission
 * postComment
 * publicComments
 * specialistComments
 */
import {
  DprPlanningApplication,
  DprDocument,
  DprComment,
  DprApplication,
} from "./definitions";
import type {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/CommentSummary.ts";

/**
 * /api/search
 * Listing of applications and search results
 */
export type DprSearchApiResponse = DprApplication[];

/**
 * /api/show
 * Details view of a single application
 */
export type DprShowApiResponse = DprApplication;

/**
 * /api/documents
 * Documents for a single application
 */
export type DprDocumentsApiResponse = DprDocument[];

/**
 * /api/applicationSubmission
 * Documents for a single application
 */
export interface DprApplicationSubmissionApiResponse {
  application: DprPlanningApplication["application"];
  submission: unknown | null;
}

/**
 * /api/postComment
 * Comment posting
 */
export type DprApplicationPostCommentApiResponse = {
  id?: string;
  message: string;
};

/**
 * /api/comments/public
 * Public comments for a single application
 */

export type DprPublicCommentsApiResponse = {
  comments: DprComment[];
  summary: PublicCommentSummary;
};

/**
 * /api/comments/specialist
 * Specialist comments for a single application
 */
export type DprSpecialistCommentsApiResponse = {
  comments: DprComment[];
  summary: SpecialistCommentSummary;
};
