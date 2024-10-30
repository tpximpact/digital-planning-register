import { DprComment, DprCommentTypes, DprPagination } from "@/types";
import { CommentCard } from "@/components/comment_card";

interface CommentsListProps {
  councilSlug: string;
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
  councilSlug,
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
    <section aria-labelledby="comments-section">
      <h2 className="govuk-heading-l" id="comments-section">
        {type === "specialist" ? "Specialist Comments" : "Public Comments"}
      </h2>

      {displayedComments && displayedComments.length > 0 ? (
        <>
          {displayedComments.map((comment, index) => (
            <CommentCard
              key={index}
              comment={comment}
              commentNumber={
                totalComments - (page * maxDisplayComments + index)
              }
            />
          ))}
          {showMoreButton && totalComments > maxDisplayComments && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {maxDisplayComments} of {totalComments} comments
                </p>
                {councilSlug && (
                  <a
                    href={`/${councilSlug}/${reference}/comments?type=${type}`}
                    role="button"
                    className="govuk-button govuk-button--secondary blue-button"
                    data-module="govuk-button"
                  >
                    Show all {totalComments}{" "}
                    {type === "specialist"
                      ? "professional consultee"
                      : "neighbour"}{" "}
                    comments
                  </a>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-hint">
              <em>
                {type === "specialist"
                  ? "No comments from specialists have been published at this time."
                  : "No comments from the public have been published at this time."}
              </em>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
