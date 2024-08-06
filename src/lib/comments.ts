/**
 * Helpers related to comments
 */

import { DprComment, BopsNonStandardComment } from "@/types";

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
export const convertCommentBops = (
  comment: BopsNonStandardComment,
): DprComment => {
  return {
    comment: comment.comment,
    received_at: comment.received_at,
    sentiment: comment.summary_tag || "",
  };
};
