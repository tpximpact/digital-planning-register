import { DprCommentTypes } from "@/types";
import "./ApplicationCommentsSummary.scss";

export const SummarySkeleton = (type: { type: DprCommentTypes }) => {
  return (
    <div id={`${type}-comments-summary`}>
      <div
        className="dpr-comment-summary__skeleton "
        data-testid="summary-skeleton"
      ></div>
    </div>
  );
};
