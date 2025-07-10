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
// "use client";
// import { capitaliseWord, formatDateTimeToDprDate } from "@/util";
// import "./PublicCommentCard.scss";
"use client";
import {
  SpecialistComment,
  TopicAndComments,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/Comment";
import "./SpecialistCommentCard.scss";
import { useState } from "react";
import { capitaliseWord, formatDateTimeToDprDate } from "@/util";
import { TextButton } from "../TextButton";
import Link from "next/link";

export interface SpecialistCommentCardProps {
  comment?: SpecialistComment;
  commentNumber?: number;
}

export function collapseCommentsByCharLimit(
  comments: string[],
  maxChars = 300,
): { text: string; truncated: boolean } {
  let text = "";
  let used = 0;
  let truncated = false;

  for (const comment of comments) {
    if (used + comment.length > maxChars) {
      text += comment.slice(0, maxChars - used);
      truncated = true;
      break;
    }

    text += comment;
    used += comment.length;
  }

  return { text, truncated };
}

/**
 * Renders each topic and comment, but only shows max 500 chars before it is collapsed.
 * Clicking the toggle shows all topics.
 */
export const SpecialistCommentCard = ({
  comment,
  commentNumber = 0,
}: SpecialistCommentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!comment) {
    return (
      <div className="dpr-specialist-comment-card">
        <div className="dpr-specialist-comment-card__header">
          <div className="dpr-specialist-comment-card__skeleton--item" />
          <div className="dpr-specialist-comment-card__skeleton--title" />
          <div className="dpr-specialist-comment-card__skeleton--body" />
        </div>
      </div>
    );
  }

  const comments: string[] = Array.isArray(comment.comment)
    ? comment.comment.map((c: TopicAndComments) => c.comment)
    : [comment.comment as string];

  const { text: collapsedText, truncated } =
    collapseCommentsByCharLimit(comments);
  const hasOverflow = truncated;

  const commentId = comment.id ?? commentNumber;
  const author = comment.author.specialism || comment.author.organisation;

  return (
    <div className="dpr-specialist-comment-card">
      <div className="dpr-specialist-comment-card__header">
        <h4 className="govuk-heading-s">Consultee Name</h4>
        <p className="govuk-body">{comment.author.name.singleLine}</p>
        {author && (
          <>
            <h4 className="govuk-heading-s">Organisation or Specialism</h4>
            <p className="govuk-body">{capitaliseWord(author)}</p>
          </>
        )}
        {comment.reason && (
          <>
            <h4 className="govuk-heading-s">Reason for consultation</h4>
            <ul className="govuk-list">
              <li>
                Article 4 Direction Area:
                <ul className="govuk-list govuk-list--bullet">
                  <li>
                    <a
                      href="https://www.planning.data.gov.uk/entity/7010002192"
                      className="govuk-link govuk-link--not-visited
    "
                    >
                      Whole District excluding the Town of Chesham - Poultry
                      production.
                    </a>
                  </li>
                  <li>Stock Lane - Classified Unnumbered</li>
                </ul>
              </li>
            </ul>
          </>
        )}
        <h4 className="govuk-heading-s">Sentiment towards application</h4>
        <p className="govuk-body">{capitaliseWord(comment.sentiment)}</p>
        <h4 className="govuk-heading-s">Date Consulted</h4>
        <p className="govuk-body">
          {formatDateTimeToDprDate(comment.consultedAt)}
        </p>
        <h4 className="govuk-heading-s">Date Response</h4>
        <p className="govuk-body">
          {formatDateTimeToDprDate(comment.respondedAt)}
        </p>
        <h4 className="govuk-heading-s">Files</h4>
        {comment.files ? (
          <div className="govuk-grid-row">
            {comment.files.map((file, i) => (
              <div key={i}>
                <div className="govuk-grid-column-one-half grid-row-extra-bottom-margin">
                  {/* add svg */}
                  <div className="govuk-grid-column-one-third">SVG</div>
                  <div className="govuk-grid-column-two-thirds">
                    <Link href={file.url} className="govuk-link govuk-body">
                      {capitaliseWord(file.name)}
                    </Link>
                    <p className="govuk-hint">{file.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "No file"
        )}
        <h4 className="govuk-heading-s">Full comment</h4>
        <div id={`specialist-comment-${commentId}`} aria-expanded={isExpanded}>
          <div className="dpr-specialist-comment-card__topic-section">
            <div className="govuk-body">
              {isExpanded
                ? comments.map((c, i) => <p key={i}>{c}</p>)
                : `${collapsedText}${truncated ? "…" : ""}`}
            </div>
          </div>
          {hasOverflow && (
            <TextButton
              aria-controls={`specialist-comment-${commentId}`}
              onClick={() => setIsExpanded(!isExpanded)}
              className="govuk-link govuk-link--no-visited-state dpr-specialist-comment-card--toggle-button"
            >
              {isExpanded
                ? "Minimise this comment"
                : "Read the rest of this comment"}
            </TextButton>
          )}
        </div>
      </div>
    </div>
  );
};
