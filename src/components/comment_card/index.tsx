import { capitaliseWord } from "../../../util/capitaliseWord";
import React, { useState, useEffect, useRef } from "react";
import { ApplicationComment } from "../../../util/type";

export const CommentCard = ({
  comment,
  commentNumber,
}: {
  comment: ApplicationComment;
  commentNumber: number;
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const commentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const current = commentContainerRef.current;
      if (current) {
        setIsOverflowing(current.scrollHeight > current.clientHeight);
      }
    };

    checkOverflow();
    // Re-check when window resizes
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [comment]);

  return (
    <>
      <hr className="govuk-section-break govuk-section-break--visible grid-row-extra-bottom-margin"></hr>

      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-full comment">
          <input
            type="checkbox"
            id={`show-comment-${commentNumber}`}
            name={`show-comment-${commentNumber}`}
            className="show-comment"
            style={{ display: "none" }}
          />
          <div ref={commentContainerRef} className="comment-container">
            <h3 className="govuk-heading-m">Comment #{commentNumber}</h3>
            <p className="govuk-body">
              <em>
                Published{" "}
                {new Date(comment?.received_at ?? "").toLocaleDateString(
                  "en-GB",
                )}
              </em>
            </p>
            {comment.summary_tag && (
              <div>
                <h4 className="govuk-heading-s">
                  Sentiment towards this application
                </h4>
                <p className="govuk-body">
                  {capitaliseWord(comment.summary_tag)}
                </p>
              </div>
            )}
            <h4 className="govuk-heading-s">Comment</h4>
            <div className="comment-text">
              <p className="govuk-body">{comment?.comment}</p>
            </div>
          </div>
          {isOverflowing && (
            <label
              className="govuk-body govuk-link govuk-link--no-visited-state comment-expander"
              htmlFor={`show-comment-${commentNumber}`}
            >
              <span className="read-comment" aria-hidden="true">
                Read the rest of
              </span>{" "}
              <span className="hide-comment" aria-hidden="true">
                Minimise
              </span>{" "}
              this comment
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentCard;
