import { DprComment, DprCommentTypes, DprPagination } from "@/types";
import CommentCard from "../comment_card";

interface CommentsListProps {
  council: string;
  reference: string;
  type: DprCommentTypes;
  comments: DprComment[] | null;
  maxDisplayComments?: number;
  from?: number;
  showMoreButton?: boolean;
  pagination?: DprPagination;
  page?: number;
}

export const CommentsList = ({
  council,
  reference,
  type,
  comments,
  maxDisplayComments = 3,
  from = 0,
  showMoreButton = false,
  page = 0,
}: CommentsListProps) => {
  const displayedComments = comments?.slice(from, from + maxDisplayComments);
  const totalComments = comments ? comments.length : 0;

  return (
    <>
      <h1 className="govuk-heading-l">
        {type === "consultee" ? "Specialist Comments" : "Public Comments"}
      </h1>

      {displayedComments && displayedComments.length > 0 ? (
        <>
          <div>
            {displayedComments.map((comment, index) => (
              <CommentCard
                key={index}
                comment={comment}
                commentNumber={
                  totalComments - (page * maxDisplayComments + index)
                }
              />
            ))}
          </div>
          {showMoreButton && totalComments > maxDisplayComments && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {maxDisplayComments} of {totalComments} comments
                </p>
                <a
                  href={`/${council}/${reference}/comments?type=${type}`}
                  role="button"
                  className="govuk-button govuk-button--secondary blue-button"
                  data-module="govuk-button"
                >
                  Show all {totalComments}{" "}
                  {type === "consultee"
                    ? "professional consultee"
                    : "neighbour"}{" "}
                  comments
                </a>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-hint">
              <em>
                {type === "consultee"
                  ? "No comments from specialists have been published at this time."
                  : "No comments from the public have been published at this time."}
              </em>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsList;
