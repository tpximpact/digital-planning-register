/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

"use client";
import { capitaliseWord, formatDateTimeToDprDate } from "@/util";
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
                published {formatDateTimeToDprDate(comment.receivedDate)}
              </span>
            )}
          </h3>
          {comment?.receivedDate && (
            <p className="govuk-body">
              <em>
                Published{" "}
                <time dateTime={comment.receivedDate}>
                  {formatDateTimeToDprDate(comment.receivedDate)}
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
