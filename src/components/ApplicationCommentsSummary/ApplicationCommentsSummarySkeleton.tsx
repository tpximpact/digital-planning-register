import { DprCommentTypes } from "@/types";
import "./ApplicationCommentsSummary.scss";

export const ApplicationCommentsSummarySkeleton = (type: {
  type: DprCommentTypes;
}) => {
  return (
    <div
      className="dpr-comment-summary dpr-comment-summary--skeleton"
      data-testid="summary-skeleton"
      id={`${type}-comments-summary`}
    ></div>
  );
};
