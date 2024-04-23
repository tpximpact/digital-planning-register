import { ApplicationComment, Data } from "../../../util/type";

import CommentCard from "../comment_card";

interface ApplicationConsulteeCommentsProps extends Data {
  consultee_comments: ApplicationComment[];
  id: string;
  maxDisplayComments?: number;
  showViewAllButton?: boolean;
}
const ApplicationConsulteeComments = ({
  consultee_comments,
  id,
  maxDisplayComments,
  showViewAllButton = true,
}: ApplicationConsulteeCommentsProps) => {
  const displayedComments = consultee_comments
    ? consultee_comments.slice(0, maxDisplayComments)
    : [];
  return (
    <>
      <h2 className="govuk-heading-l">Specialist Comments</h2>
      {consultee_comments && consultee_comments.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            {displayedComments.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </div>
          {showViewAllButton &&
            maxDisplayComments &&
            consultee_comments.length > maxDisplayComments && (
              <div className="govuk-grid-row grid-row-extra-bottom-margin">
                <div className="govuk-grid-column-full">
                  <p className="govuk-hint">
                    Showing {maxDisplayComments} of {consultee_comments.length}{" "}
                    comments
                  </p>
                  <a
                    href={`/${id}/consultee_comments`}
                    role="button"
                    className="govuk-button govuk-button--primary"
                    data-module="govuk-button"
                  >
                    Show all {consultee_comments.length} professional consultee
                    comments
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
                No comments from specialists have been published at this time.
              </em>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationConsulteeComments;
