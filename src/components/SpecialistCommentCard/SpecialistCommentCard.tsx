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
import "./SpecialistCommentCard.scss";
import { useState } from "react";
import {
  capitalizeFirstLetter,
  formatDateTimeToDprDate,
  pascalToSentenceCase,
} from "@/util";
import { TextButton } from "../TextButton";
import { Attachment } from "../govukDpr/Attachment";
import {
  SpecialistCommentRedacted,
  SpecialistRedacted,
} from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import { SpecialistReason } from "../SpecialistReason";
import { createPathFromParams } from "@/lib/navigation";

export interface SpecialistCommentCardProps {
  params: { council: string; reference: string };
  specialist?: SpecialistRedacted;
  comment?: SpecialistCommentRedacted;
}

export function collapseCommentsByCharLimit(
  commentText: string,
  maxChars = 300,
): { text: string; truncated: boolean } {
  if (commentText.length > maxChars) {
    return {
      text: commentText.slice(0, maxChars),
      truncated: true,
    };
  }
  return { text: commentText, truncated: false };
}

/**
 * Renders the latest specialist comment, collapsing it if it exceeds a character limit.
 */
export const SpecialistCommentCard = ({
  params,
  specialist,
  comment,
}: SpecialistCommentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!specialist) {
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

  // Get the latest comment object (assuming comments array is ordered latest first)
  const featuredSpecialComment = !comment ? specialist.comments[0] : comment;

  const { text: collapsedText, truncated } = collapseCommentsByCharLimit(
    featuredSpecialComment ? featuredSpecialComment.commentRedacted : "",
  );
  const hasOverflow = truncated;

  return (
    <div className="dpr-specialist-comment-card">
      <div className="dpr-specialist-comment-card__header">
        <h3 className="govuk-heading-m">
          Response {featuredSpecialComment && `#${featuredSpecialComment.id}`}
        </h3>
        {!comment && (
          <>
            {specialist?.organisationSpecialism && (
              <>
                <h4 className="govuk-heading-s">Organisation or specialism</h4>
                <p className="govuk-body">
                  {specialist?.organisationSpecialism}
                </p>
              </>
            )}
            {specialist.reason && (
              <>
                <h4 className="govuk-heading-s">Reason for consultation</h4>
                <SpecialistReason
                  constraints={specialist.constraints}
                  reason={specialist.reason}
                />
              </>
            )}
            {featuredSpecialComment && featuredSpecialComment.sentiment && (
              <>
                <h4 className="govuk-heading-s">
                  Sentiment towards application
                </h4>
                <p className="govuk-body">
                  {capitalizeFirstLetter(
                    pascalToSentenceCase(featuredSpecialComment.sentiment),
                  )}
                </p>
              </>
            )}
            {specialist.firstConsultedAt && (
              <>
                <h4 className="govuk-heading-s">Date Consulted</h4>
                <p className="govuk-body">
                  {formatDateTimeToDprDate(specialist.firstConsultedAt)}
                </p>
              </>
            )}
          </>
        )}
        {featuredSpecialComment &&
          featuredSpecialComment.metadata?.publishedAt && (
            <>
              <h4 className="govuk-heading-s">Date of Response</h4>
              <p className="govuk-body">
                {formatDateTimeToDprDate(
                  featuredSpecialComment.metadata.publishedAt,
                )}
              </p>
            </>
          )}

        {featuredSpecialComment &&
          featuredSpecialComment.files &&
          featuredSpecialComment.files.length > 0 && (
            <>
              <h4 className="govuk-heading-s">Files</h4>
              <div className="dpr-specialist-comment-card__files">
                <div className="dpr-specialist-comment-card__files-cards">
                  {featuredSpecialComment.files.map((file, i) => (
                    <Attachment
                      key={`${featuredSpecialComment?.id}-file-${i}`}
                      title={file?.name}
                      url={file?.redactedUrl ?? file?.url}
                      fileName={file?.name}
                      thumbnailUrl={file?.thumbnailUrl}
                      fileSize={file.metadata?.size?.bytes}
                      uploadedAt={file.metadata?.createdAt}
                      {...(file?.metadata?.mimeType !== undefined
                        ? { mimeType: file?.metadata?.mimeType }
                        : {})}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

        {featuredSpecialComment && featuredSpecialComment.commentRedacted && (
          <>
            <h4 className="govuk-heading-s">Full comment</h4>
            <div id={`specialist-comment-${specialist?.id}`}>
              <div className="dpr-specialist-comment-card__topic-section">
                <div className="govuk-body">
                  {isExpanded ? (
                    <p>{featuredSpecialComment?.commentRedacted}</p>
                  ) : (
                    `${collapsedText}${truncated ? "…" : ""}`
                  )}
                </div>
              </div>
              {hasOverflow && (
                <TextButton
                  aria-expanded={isExpanded}
                  aria-controls={`specialist-comment-${specialist?.id}`}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="govuk-link govuk-link--no-visited-state dpr-specialist-comment-card--toggle-button"
                >
                  {isExpanded
                    ? "Minimise this comment"
                    : "Read the rest of this comment"}
                </TextButton>
              )}
            </div>
          </>
        )}
      </div>
      {!comment && specialist.comments.length > 1 && (
        <>
          <TextButton
            href={createPathFromParams(
              params,
              `specialist-comments/${specialist.id}`,
            )}
            className="govuk-link govuk-link--no-visited-state"
          >
            {/* we will need to add a href or onclick prop here once we have the page set up to go to the specialist id */}
            View all responses ({specialist.comments.length})
          </TextButton>
        </>
      )}
    </div>
  );
};
