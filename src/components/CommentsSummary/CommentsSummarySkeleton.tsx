import { CommentType } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentType";
import "./CommentsSummary.scss";
import { capitalizeFirstLetter } from "@/util";

interface CommentsSummarySkeletonProps {
  type: CommentType;
}

export const CommentsSummarySkeleton = ({
  type,
}: CommentsSummarySkeletonProps) => {
  return (
    <div className="dpr-comment-summary" id={`${type}-comments-summary`}>
      <h2 className="govuk-heading-l">{`${capitalizeFirstLetter(type as string)} Comments`}</h2>
      <div className="dpr-comment-summary__skeleton" aria-hidden={true}></div>
    </div>
  );
};
