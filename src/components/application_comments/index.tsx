// /path/to/ApplicationComments.tsx
import { ApplicationComment, Data } from "../../../util/type";
import CommentCard from "../comment_card";

interface ApplicationCommentsProps extends Data {
  comments?: ApplicationComment[];
  id: string;
  type: "consultee" | "published";
  maxDisplayComments?: number;
  showViewAllButton?: boolean;
}

const ApplicationComments = ({
  comments = [],
  id,
  type,
  maxDisplayComments,
  showViewAllButton = true,
}: ApplicationCommentsProps) => {
  const displayedComments = comments.slice(
    0,
    maxDisplayComments ?? comments.length,
  );
  const commentTypeLabel =
    type === "consultee" ? "professional consultee" : "neighbour";
  const noCommentsMessage =
    type === "consultee"
      ? "No comments from specialists have been published at this time."
      : "No comments from the public have been published at this time.";

  const sortedComments = displayedComments.sort((a, b) => {
    const dateA = a.received_at ? new Date(a.received_at).getTime() : 0;
    const dateB = b.received_at ? new Date(b.received_at).getTime() : 0;
    return dateB - dateA;
  });
  return (
    <>
      <h2 className="govuk-heading-l">
        {type === "consultee" ? "Specialist Comments" : "Public Comments"}
      </h2>
      {comments.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            {sortedComments.map((comment, index) => (
              <CommentCard
                key={index}
                comment={comment}
                commentNumber={index + 1}
              />
            ))}
          </div>
          {showViewAllButton &&
            maxDisplayComments &&
            comments.length > maxDisplayComments && (
              <div className="govuk-grid-row grid-row-extra-bottom-margin">
                <div className="govuk-grid-column-full">
                  <p className="govuk-hint">
                    Showing {maxDisplayComments} of {comments.length} comments
                  </p>
                  <a
                    href={`/${id}/comments?type=${type}`}
                    role="button"
                    className="govuk-button govuk-button--primary"
                    data-module="govuk-button"
                  >
                    Show all {comments.length} {commentTypeLabel} comments
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
