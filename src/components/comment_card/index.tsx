"use client";
import { capitaliseWord } from "../../../util/capitaliseWord";
import React, { useState, useEffect, useRef } from "react";
import { DprComment } from "@/types";

interface CommentCardProps {
  comment: DprComment;
  commentNumber: number;
}

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
    <>
      <hr className="govuk-section-break govuk-section-break--visible grid-row-extra-bottom-margin" />
      <div className="govuk-grid-row grid-row-extra-bottom-margin comment">
        <div className="govuk-grid-column-full">
          <div
            ref={commentContainerRef}
            className={`comment-container ${isOverflowing ? "comment-container-js" : ""}`}
          >
            <h2 className="govuk-heading-m">Comment #{commentNumber}</h2>
            <p className="govuk-body">
              <em>
                Published{" "}
                {new Date(comment?.received_at ?? "").toLocaleDateString(
                  "en-GB",
                )}
              </em>
            </p>
            {comment.sentiment && (
              <div>
                <div className="govuk-heading-s">
                  Sentiment towards this application
                </div>
                <p className="govuk-body">
                  {capitaliseWord(comment.sentiment)}
                </p>
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
    </>
  );
};

export default CommentCard;
