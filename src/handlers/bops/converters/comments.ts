import { DprComment } from "@/types";
import { BopsComment } from "../types";
import { convertDateTimeToUtc } from "@/util";

/**
 * Converts BOPS comments into our standard format (which RN is the same as BOPS!)
 * @todo some dates seem to be coming in without times!
 * @param comment
 * @returns
 */
export const convertCommentBops = (
  comment: BopsComment,
  i: number,
): DprComment => {
  return {
    comment: comment.comment,
    receivedDate: convertDateTimeToUtc(comment.receivedAt),
    sentiment: comment.summaryTag || "",
  };
};
