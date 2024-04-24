export const CommentCard = ({ comment }: { comment: any }) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin">
      <div className="govuk-grid-column-full comment">
        <div className="comment-container">
          <h3 className="govuk-heading-m">Comment #104</h3>
          <p className="govuk-body">
            <em>
              Published{" "}
              {new Date(comment?.received_at ?? "").toLocaleDateString("en-GB")}
            </em>
          </p>
          {comment?.summary_tag?.length > 0 && (
            <div>
              <h4 className="govuk-heading-s">
                Sentiment towards this application
              </h4>
              <p className="govuk-body">{comment?.summary_tag}</p>
            </div>
          )}
          <h4 className="govuk-heading-s">Comment</h4>
          <p className="govuk-body">{comment?.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
