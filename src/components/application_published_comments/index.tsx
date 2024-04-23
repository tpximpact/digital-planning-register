import { Data, ApplicationComment } from "../../../util/type";

import CommentCard from "../comment_card";

interface ApplicationPublishedCommentsProps {
  id: string;
  showViewAllButton?: boolean;
  maxDisplayComments?: number;
  published_comments: ApplicationComment[];
}
const ApplicationPublishedComments = ({
  id,
  showViewAllButton = true,
  maxDisplayComments,
  published_comments,
}: ApplicationPublishedCommentsProps) => {
  const displayedComments =
    published_comments?.slice(0, maxDisplayComments) ?? [];
  return (
    <>
      <h2 className="govuk-heading-l">Published Comments</h2>
      {published_comments && published_comments.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            {displayedComments.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </div>
          {showViewAllButton &&
            maxDisplayComments &&
            published_comments.length > maxDisplayComments && (
              <div className="govuk-grid-row grid-row-extra-bottom-margin">
                <div className="govuk-grid-column-full">
                  <p className="govuk-hint">
                    Showing {maxDisplayComments} of {published_comments.length}{" "}
                    comments
                  </p>
                  <a
                    href={`/${id}/published_comments`}
                    role="button"
                    className="govuk-button govuk-button--primary"
                    data-module="govuk-button"
                  >
                    Show all {published_comments.length} neighbour comments
                  </a>
                </div>
              </div>
            )}
        </>
      ) : (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-one-third-from-desktop">
            <p className="govuk-hint">
              <em>
                No comments from the public have been published at this time.
              </em>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationPublishedComments;
