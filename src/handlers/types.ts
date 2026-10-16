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

import type {
  ApiResponse,
  DprApplicationPostCommentApiResponse,
  DprApplicationSubmissionApiResponse,
  DprCommentSubmission,
  DprDocumentsApiResponse,
  DprPublicCommentsApiResponse,
  DprSearchApiResponse,
  DprShowApiResponse,
  DprSpecialistApiResponse,
  DprSpecialistCommentsApiResponse,
  SearchParamsApplication,
  SearchParamsComments,
  SearchParamsDocuments,
  SearchParamsSpecialistComments,
} from "@/types";

type Result<T> = Promise<ApiResponse<T | null>>;

/**
 * The contract every data source implements.
 *
 * There are two implementations: `local` (generated example data) and
 * `external` (the DPR backend API, with optional per-source extras).
 * Callers never use this directly, they go through `ApiV1`.
 */
export interface ApiHandler {
  search(
    council: string,
    searchParams?: SearchParamsApplication,
  ): Result<DprSearchApiResponse>;

  show(council: string, reference: string): Result<DprShowApiResponse>;

  applicationSubmission(
    council: string,
    reference: string,
  ): Result<DprApplicationSubmissionApiResponse>;

  documents(
    council: string,
    reference: string,
    searchParams?: SearchParamsDocuments,
  ): Result<DprDocumentsApiResponse>;

  publicComments(
    council: string,
    reference: string,
    searchParams?: SearchParamsComments,
  ): Result<DprPublicCommentsApiResponse>;

  specialistComments(
    council: string,
    reference: string,
    searchParams?: SearchParamsComments,
  ): Result<DprSpecialistCommentsApiResponse>;

  specialist(
    council: string,
    reference: string,
    specialistId: string,
    searchParams?: SearchParamsSpecialistComments,
  ): Result<DprSpecialistApiResponse>;

  postComment(
    council: string,
    reference: string,
    apiData: DprCommentSubmission,
  ): Result<DprApplicationPostCommentApiResponse>;
}
