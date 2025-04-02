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
import React, { useState } from "react";
import { DprComment } from "@/types";
import "./CommentCard.scss";
import { splitCommentText } from "./utils";

export interface CommentCardProps {
  comment: DprComment;
  commentNumber?: number;
}

/**
 *
 * @todo investigate using <details> and <summary> for the expandable comment functionality
 * @param param0
 * @returns
 */
export const CommentCard = ({ comment, commentNumber }: CommentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (comment) {
    const [summary, continued] = splitCommentText(comment.comment);
    const commentId = comment?.id || commentNumber;

    return (
      <div className="dpr-comment-card govuk-grid-row">
        <div className="govuk-grid-column-full">
          <div className="comment-container">
            <h3 className="govuk-heading-m">
              {`Comment #${commentId}`}
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
                <p className="govuk-body">
                  {capitaliseWord(comment.sentiment)}
                </p>
              </div>
            )}
            <div className="govuk-heading-s">Comment</div>
            <div className="comment-text">
              <div className="govuk-body">
                {summary}

                {!isExpanded && continued && (
                  <span className="read-more-ellipsis">...</span>
                )}
                {isExpanded && continued && <span>{continued}</span>}
              </div>

              {continued && (
                <button
                  aria-expanded={isExpanded}
                  aria-controls={`comment-${commentId}`}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="govuk-body govuk-link govuk-link--no-visited-state dpr-comment-card--toggle"
                >
                  {isExpanded
                    ? "Minimise this comment"
                    : "Read the rest of this comment"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="comment-card">
        <div className="comment-card__skeleton-item"></div>
        <div className="comment-card__skeleton-item"></div>
        <div className="comment-card__skeleton-item"></div>
      </div>
    );
  }
};
