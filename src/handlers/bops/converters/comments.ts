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

import { DprComment } from "@/types";
import { BopsComment, BopsSpecialist } from "../types";
import { convertDateTimeToUtc } from "@/util";
import { SpecialistRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import { CommentMetaData } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/CommentMetaData.js";

/**
 * Converts BOPS comments into our standard format (which RN is the same as BOPS!)
 * @todo some dates seem to be coming in without times!
 * @param comment
 * @returns
 */
export const convertCommentBops = (comment: BopsComment): DprComment => {
  return {
    id: comment.id,
    comment: comment.comment,
    receivedDate: convertDateTimeToUtc(comment.receivedAt),
    sentiment: comment.sentiment || "",
  };
};

/**
 * Converts BOPS Specialist into Specialist
 * @todo some dates seem to be coming in without times!
 * @param comment
 * @returns
 */
export const convertBopsSpecialist = (
  specialist: BopsSpecialist,
): SpecialistRedacted => {
  const { comments, ...rest } = specialist;

  const convertedComments = Array.isArray(comments)
    ? comments.map((comment) => {
        // Build new metadata object with only available dates, pulling from previous if missing
        const submittedAt =
          comment.metadata?.submittedAt ??
          comment.metadata?.validatedAt ??
          comment.metadata?.publishedAt ??
          "";
        const validatedAt =
          comment.metadata?.validatedAt ??
          comment.metadata?.publishedAt ??
          comment.metadata?.submittedAt ??
          "";
        const publishedAt =
          comment.metadata?.publishedAt ??
          comment.metadata?.validatedAt ??
          comment.metadata?.submittedAt ??
          "";

        // Always provide all required fields
        const metadata: Required<CommentMetaData> = {
          submittedAt,
          validatedAt,
          publishedAt,
        };

        return {
          ...comment,
          metadata,
        };
      })
    : [];

  return {
    ...rest,
    comments: convertedComments,
    name: {
      singleLine: "Unknown",
    },
  };
};
