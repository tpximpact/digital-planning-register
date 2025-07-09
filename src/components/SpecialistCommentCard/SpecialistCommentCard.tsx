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
import { formatDateTimeToDprDate } from "@/util";
import { TextButton } from "../TextButton";
import { Attachment } from "../govukDpr/Attachment";
import { Specialist } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import { formatSpecialistSentiment } from "@/lib/comments";

export interface SpecialistCommentCardProps {
  specialist?: Specialist;
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
  specialist,
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
  const latestSpecialistComment = specialist.comments[0];

  const { text: collapsedText, truncated } = collapseCommentsByCharLimit(
    latestSpecialistComment.comment,
  );
  const hasOverflow = truncated;

  return (
    <div className="dpr-specialist-comment-card">
      <div className="dpr-specialist-comment-card__header">
        {specialist?.organisationSpecialism && (
          <>
            <h4 className="govuk-heading-s">Organisation or specialism</h4>
            <p className="govuk-body">{specialist?.organisationSpecialism}</p>
          </>
        )}
        {specialist.reason && (
          <>
            <h4 className="govuk-heading-s">Reason for consultation</h4>
            {specialist.reason === "Constraint" ? (
              specialist.constraints && specialist.constraints.length > 0 ? (
                specialist.constraints.map((constraint, index) => (
                  <div key={index}>
                    <p className="govuk-body">{constraint.description}</p>
                    {constraint.intersects &&
                      constraint.entities &&
                      constraint.entities.length > 0 && (
                        <ul className="govuk-list govuk-list--bullet">
                          {constraint.entities.map(
                            (entity: { name: string }, entityIndex: number) => (
                              <li
                                className="govuk-list__item"
                                key={`${index}-${entityIndex}`}
                              >
                                {entity.name}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                  </div>
                ))
              ) : (
                <p className="govuk-body">{specialist.reason}</p>
              )
            ) : (
              <p className="govuk-body">{specialist.reason}</p>
            )}
          </>
        )}
        {latestSpecialistComment.sentiment && (
          <>
            <h4 className="govuk-heading-s">Sentiment towards application</h4>
            <p className="govuk-body">
              {formatSpecialistSentiment(latestSpecialistComment.sentiment)}
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
        {latestSpecialistComment.metadata?.publishedAt && (
          <>
            <h4 className="govuk-heading-s">Date of Response</h4>
            <p className="govuk-body">
              {formatDateTimeToDprDate(
                latestSpecialistComment.metadata.publishedAt,
              )}
            </p>
          </>
        )}
        <h4 className="govuk-heading-s">Files</h4>
        <div className="dpr-specialist-comment-card__files">
          {latestSpecialistComment.files &&
          latestSpecialistComment.files.length > 0 ? (
            <div className="dpr-specialist-comment-card__files-cards">
              {latestSpecialistComment.files.map((file, i) => (
                <Attachment
                  key={`${latestSpecialistComment?.id}-file-${i}`}
                  title={file?.name}
                  url={file?.url}
                  fileName={file?.name}
                  thumbnailUrl={file?.thumbnailUrl}
                  contentType={file?.metadata?.mimeType}
                  fileSize={file.metadata?.size?.bytes}
                  createdDate={file.metadata?.createdAt}
                />
              ))}
            </div>
          ) : (
            <p className="govuk-body">No files</p>
          )}
        </div>
        <h4 className="govuk-heading-s">Full comment</h4>
        <div
          id={`specialist-comment-${specialist?.id}`}
          aria-expanded={isExpanded}
        >
          <div className="dpr-specialist-comment-card__topic-section">
            <div className="govuk-body">
              {isExpanded ? (
                <p>{latestSpecialistComment?.commentRedacted}</p>
              ) : (
                `${collapsedText}${truncated ? "…" : ""}`
              )}
            </div>
          </div>
          {hasOverflow && (
            <TextButton
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
      </div>
      {specialist.comments.length > 1 && (
        <>
          <TextButton>
            {/* we will need to add a href or onclick prop here once we have the page set up to go to the specialist id */}
            View all responses ({specialist.comments.length})
          </TextButton>
        </>
      )}
    </div>
  );
};
