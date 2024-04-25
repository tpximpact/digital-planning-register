import { firstLetterUppercase } from "@/help";

export const CommentCard = ({
  comment,
  commentNumber,
}: {
  comment: any;
  commentNumber: any;
}) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin">
      <div className="govuk-grid-column-full comment">
        <input
          type="checkbox"
          id={`show-comment-${commentNumber}`}
          name={`show-comment-${commentNumber}`}
          className="show-comment"
        />
        <div className="comment-container">
          <h3 className="govuk-heading-m">Comment #{commentNumber}</h3>
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
              <p className="govuk-body">
                {firstLetterUppercase(comment?.summary_tag)}
              </p>
            </div>
          )}
          <h4 className="govuk-heading-s">Comment</h4>
          <div className="comment-text">
            <p className="govuk-body">{comment?.comment}</p>
          </div>
        </div>
        <label
          className="govuk-body govuk-link govuk-link--no-visited-state comment-expander"
          htmlFor={`show-comment-${commentNumber}`}
        >
          <span className="read-comment">Read the rest of</span>{" "}
          <span className="hide-comment">Minimise</span> this comment
        </label>
      </div>
    </div>
  );
};

export default CommentCard;
