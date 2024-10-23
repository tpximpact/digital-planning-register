/**
 * Helpers related to comments
 */

import {
  DprComment,
  DprCommentTypes,
  DprPagination,
  DprPlanningApplication,
  SearchParams,
} from "@/types";
import { BopsComment } from "@/handlers/bops/types";
import { AppConfig } from "@/config/types";
import { createItemPagination } from "./pagination";

/**
 * Sort comments by newest first
 * @param comments
 * @returns
 */
export const sortComments = (comments: DprComment[]) => {
  return comments?.sort((a, b) => {
    const dateA = a.received_at ? new Date(a.received_at).getTime() : 0;
    const dateB = b.received_at ? new Date(b.received_at).getTime() : 0;
    return dateB - dateA;
  });
};

/**
 * Converts BOPS comments into our standard format (which RN is the same as BOPS!)
 * @param comment
 * @returns
 */
export const convertCommentBops = (comment: BopsComment): DprComment => {
  return {
    comment: comment.comment,
    received_at: comment.receivedAt,
    sentiment: comment.summaryTag || "",
  };
};

/**
 * returns the type assuming its available in the config
 * @param council
 * @param searchParams
 * @returns
 */
export const getCommentTypeToShow = (
  council: AppConfig["council"],
  searchParams?: SearchParams,
): DprCommentTypes => {
  let type: DprCommentTypes =
    (searchParams?.type as DprCommentTypes) ??
    (council?.publicComments ? "public" : "specialist");

  // Ensure type is either "public" or "specialist"
  if (!["public", "specialist"].includes(type)) {
    type = council?.publicComments ? "public" : "specialist";
  }

  return type;
};

/**
 * Builds the comments result into our format so that it looks like it came from the API
 */
export const buildCommentResult = (
  appConfig: AppConfig,
  type: DprCommentTypes,
  application: DprPlanningApplication,
  searchParams?: SearchParams,
) => {
  const comments =
    type === "specialist"
      ? application.application?.consultation.consulteeComments
      : type === "public"
        ? application.application?.consultation.publishedComments
        : null;

  const totalComments = comments ? comments.length : 0;
  const currentPage = Number(searchParams?.page ?? 1);

  const commentData: { pagination: DprPagination; data: DprComment[] } = {
    pagination: {
      ...createItemPagination(
        totalComments,
        currentPage,
        appConfig.defaults.resultsPerPage,
      ),
    },
    data: comments ? [...comments] : [],
  };

  return commentData;
};
