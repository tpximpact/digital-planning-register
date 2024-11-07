import { DprComment } from "@/types";
import { BopsComment } from "../types";

/**
 * Converts BOPS comments into our standard format (which RN is the same as BOPS!)
 * @param comment
 * @returns
 */
export const convertCommentBops = (
  comment: BopsComment,
  i: number,
): DprComment => {
  return {
    comment: comment.comment,
    received_at: comment.receivedAt,
    sentiment: comment.summaryTag || "",
  };
};
