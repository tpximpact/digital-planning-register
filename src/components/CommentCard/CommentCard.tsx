"use client";
import { capitaliseWord, formatDateTimeToDprDateTime } from "@/util";
import React, { useState, useEffect, useRef } from "react";
import { DprComment } from "@/types";
import "./CommentCard.scss";

export interface CommentCardProps {
  comment: DprComment;
  commentNumber: number;
}

/**
 *
 * @todo investigate using <details> and <summary> for the expandable comment functionality
 * @param param0
 * @returns
 */
export const CommentCard = ({ comment, commentNumber }: CommentCardProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const current = commentContainerRef.current;
      if (current) {
        const isOverflow = current.scrollHeight > 25 * 16;
        setIsOverflowing(isOverflow);
        if (!isExpanded && isOverflow) {
          current.style.maxHeight = "25rem";
        }
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [comment, isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    const current = commentContainerRef.current;
    if (current) {
      current.style.maxHeight = isExpanded ? "25rem" : "none";
    }
  };

  return (
    <div className="dpr-comment-card govuk-grid-row">
      <div className="govuk-grid-column-full">
        <div
          ref={commentContainerRef}
          className={`comment-container ${isOverflowing ? "comment-container-js" : ""}`}
        >
          <h3 className="govuk-heading-m">
            {`Comment #${commentNumber}`}
            {comment?.receivedDate && (
              <span className="govuk-visually-hidden">
                published {formatDateTimeToDprDateTime(comment.receivedDate)}
              </span>
            )}
          </h3>
          {comment?.receivedDate && (
            <p className="govuk-body">
              <em>
                Published{" "}
                <time dateTime={comment.receivedDate}>
                  {formatDateTimeToDprDateTime(comment.receivedDate)}
                </time>
              </em>
            </p>
          )}
          {comment.sentiment && (
            <div>
              <div className="govuk-heading-s">
                Sentiment towards this application
              </div>
              <p className="govuk-body">{capitaliseWord(comment.sentiment)}</p>
            </div>
          )}
          <div className="govuk-heading-s">Comment</div>
          <div className="comment-text">
            <p className="govuk-body">{comment?.comment}</p>
          </div>
        </div>
        {isOverflowing && !isExpanded && (
          <div className="read-more-ellipsis">...</div>
        )}
        {isOverflowing && (
          <div
            className="govuk-body govuk-link govuk-link--no-visited-state comment-expander"
            onClick={toggleExpand}
          >
            {isExpanded
              ? "Minimise this comment"
              : "Read the rest of this comment"}
          </div>
        )}
      </div>
    </div>
  );
};
