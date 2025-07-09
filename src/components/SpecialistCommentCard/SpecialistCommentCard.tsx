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
  // TopicAndComments,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/Comment";
import "./SpecialistCommentCard.scss";
// import { COMMENT_PUBLIC_TOPIC_OPTIONS } from "@/lib/comments";
import { useState } from "react";
import {
  // capitaliseWord,
  formatDateTimeToDprDate,
} from "@/util";
// import { collapseTopicsByCharLimit } from "./PublicCommentCard.utils";
import { TextButton } from "../TextButton";
import Link from "next/link";

export interface SpecialistCommentCardProps {
  comment?: SpecialistComment;
  commentNumber?: number;
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
      <div className="dpr-public-comment-card">
        <div className="dpr-public-comment-card__header">
          <div className="dpr-public-comment-card__skeleton--item" />
          <div className="dpr-public-comment-card__skeleton--title" />
          <div className="dpr-public-comment-card__skeleton--body" />
        </div>
      </div>
    );
  }

  //   const topicsAndComments: TopicAndComments[] = Array.isArray(comment.comment)
  //     ? comment.comment
  //     : [
  //         {
  //           topic: "other",
  //           question: "",
  //           comment: comment.comment as string,
  //         },
  //       ];

  // const collapsedTopicsAndComments =
  //   collapseTopicsByCharLimit(topicsAndComments);

  // const displayedTopicsAndComments = isExpanded
  //   ? topicsAndComments.map((t, i) => ({
  //       originalIndex: i,
  //       topic: t.topic,
  //       question: t.question,
  //       comment: t.comment,
  //       truncated: false,
  //     }))
  //   : collapsedTopicsAndComments;

  // const hasOverflow =
  //   collapsedTopicsAndComments.length < topicsAndComments.length ||
  //   collapsedTopicsAndComments.some((topicObj) => topicObj.truncated);

  const commentId = comment.id ?? commentNumber;

  return (
    // <>
    <div className="dpr-public-comment-card">
      <div className="dpr-public-comment-card__header">
        <h4 className="govuk-heading-s">Consultee Name</h4>
        <p className="govuk-body">{comment.author.name.singleLine}</p>
        <h4 className="govuk-heading-s">Organisation or specialism</h4>
        <p className="govuk-body">
          {comment.author.specialism || comment.author.organisation}
        </p>
        {comment.reason && (
          <>
            <h4 className="govuk-heading-s">Reason for consultation</h4>
            <Link href={comment.reason} className="govuk-link govuk-body">
              {comment.reason}
            </Link>
          </>
        )}
        <h4 className="govuk-heading-s">Sentiment towards application</h4>
        <p className="govuk-body">{comment.sentiment}</p>
        <h4 className="govuk-heading-s">Date Consulted</h4>
        <p className="govuk-body">
          {formatDateTimeToDprDate(comment.consultedAt)}
        </p>
        <h4 className="govuk-heading-s">Date Response</h4>
        <p className="govuk-body">
          {formatDateTimeToDprDate(comment.respondedAt)}
        </p>
        <h4 className="govuk-heading-s">Files</h4>
        {/* <p className="govuk-body">{comment.files}</p> */}
        <h4 className="govuk-heading-s">Full comment</h4>
        <p className="govuk-body">{comment.comment}</p>

        {comment.metadata?.publishedAt && (
          <p className="govuk-body">
            <em>
              Published{" "}
              <time dateTime={comment.metadata.publishedAt}>
                {/* {formatDateTimeToDprDate(comment.metadata.publishedAt)} */}
              </time>
            </em>
          </p>
        )}

        {/* {comment.sentiment && (
          <div>
            <div className="govuk-heading-s">
              Sentiment towards this application
            </div> */}
        {/* <p className="govuk-body">{capitaliseWord(comment.sentiment)}</p> */}
        {/* </div>
        )} */}
        {/* <div id={`public-comment-${commentId}`} aria-expanded={isExpanded}>
          {displayedTopicsAndComments.map((topicObj) => {
            const option = COMMENT_PUBLIC_TOPIC_OPTIONS.find(
              (o) => o.value === topicObj.topic,
            );
            const title = option?.label ?? capitaliseWord(topicObj.topic);
            return (
              <div
                key={topicObj.originalIndex}
                className="dpr-public-comment-card__topic-section"
              >
                <div className="govuk-heading-s">{title}</div>
                <div className="govuk-body">
                  {topicObj.comment}
                  {!isExpanded && topicObj.truncated && "…"}
                </div>
              </div>
            );
          })} */}

        {/* {hasOverflow && ( */}
        <TextButton
          aria-controls={`public-comment-${commentId}`}
          onClick={() => setIsExpanded(!isExpanded)}
          className="govuk-link govuk-link--no-visited-state dpr-public-comment-card--toggle-button"
        >
          {isExpanded
            ? "Minimise this comment"
            : "Read the rest of this comment"}
        </TextButton>
        {/* )} */}
        {/* </div> */}
      </div>
    </div>
  );
};
