// /path/to/ApplicationComments.tsx
import { ApplicationComment, Data } from "../../../util/type";
import CommentCard from "../comment_card";

interface ApplicationCommentsProps extends Data {
  comments?: ApplicationComment[];
  id: string;
  type: "consultee" | "published";
  maxDisplayComments?: number;
  showViewAllButton?: boolean;
  totalComments?: number;
  currentPage?: number;
}

const ApplicationComments = ({
  comments = [],
  id,
  type,
  maxDisplayComments = 10,
  showViewAllButton = true,
  totalComments = 0,
  currentPage = 0,
}: ApplicationCommentsProps) => {
  const displayedComments = comments.slice(0, maxDisplayComments);

  const commentTypeLabel =
    type === "consultee" ? "professional consultee" : "neighbour";
  const noCommentsMessage =
    type === "consultee"
      ? "No comments from specialists have been published at this time."
      : "No comments from the public have been published at this time.";

  return (
    <>
      <h2 className="govuk-heading-l">
        {type === "consultee" ? "Specialist Comments" : "Public Comments"}
      </h2>
      {comments.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            {displayedComments.map((comment, index) => (
              <CommentCard
                key={index}
                comment={comment}
                commentNumber={
                  totalComments - (currentPage * maxDisplayComments + index)
                }
              />
            ))}
          </div>
          {showViewAllButton && totalComments > maxDisplayComments && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {""}
                  {Math.min(
                    (currentPage + 1) * maxDisplayComments,
                    totalComments,
                  )}{" "}
                  of {totalComments} comments
                </p>
                <a
                  href={`/${id}/comments?type=${type}`}
                  role="button"
                  className="govuk-button govuk-button--primary"
                  data-module="govuk-button"
                >
                  Show all {totalComments} {commentTypeLabel} comments
                </a>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-one-third-from-desktop">
            <p className="govuk-hint">
              <em>{noCommentsMessage}</em>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationComments;
