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

import { DprComment, DprCommentTypes } from "@/types";
import { CommentCard } from "@/components/CommentCard";
import "./CommentsList.scss";
import { Button } from "@/components/button";
import {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/CommentSummary";

export interface CommentsListProps {
  councilSlug: string;
  reference: string;
  comments: DprComment[] | null;
  type?: DprCommentTypes;
  resultsPerPage?: number;
  summary?: PublicCommentSummary | SpecialistCommentSummary;
}

/**
 * Similar to ApplicationCard on the search page we leave whats displayed up to the parent component
 * NB getCommentTypeToShow in the page determines what kind of comments to show based on the appConfig
 * @param param0
 * @returns
 */
export const CommentsList = ({
  councilSlug,
  reference,
  comments,
  type,
  resultsPerPage,
  summary,
}: CommentsListProps) => {
  const displayedComments = comments?.slice(0, resultsPerPage);
  const totalComments = summary?.totalComments;
  return (
    <section
      aria-labelledby={
        type === "specialist"
          ? "specialist-comments-section"
          : "public-comments-section"
      }
      id={type === "specialist" ? "specialist-comments" : "public-comments"}
    >
      <h2
        className="govuk-heading-l"
        id={
          type === "specialist"
            ? "specialist-comments-section"
            : "public-comments-section"
        }
      >
        {type === "specialist" ? "Specialist Comments" : "Public Comments"}
      </h2>

      {comments && displayedComments && displayedComments.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            {displayedComments.map((comment, i) => (
              <CommentCard
                key={i}
                comment={comment}
                commentNumber={comment?.id}
              />
            ))}
          </div>
          {comments.length >= 3 && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {displayedComments.length} of {totalComments} comments
                </p>
                {councilSlug && (
                  <Button
                    variant="information"
                    element="link"
                    href={`/${councilSlug}/${reference}/comments?type=${type}`}
                  >
                    {`Show all ${totalComments} ${
                      type === "specialist"
                        ? "professional consultee"
                        : "neighbour"
                    } comments`}
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-hint">
              <em>
                {type === "specialist"
                  ? "No comments from specialists have been published at this time."
                  : "No comments from the public have been published at this time."}
              </em>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export function CommentsListSkeleton({ type }: { type?: DprCommentTypes }) {
  const sectionId =
    type === "specialist" ? "specialist-comments" : "public-comments";
  const headingId =
    type === "specialist"
      ? "specialist-comments-section"
      : "public-comments-section";

  return (
    <section id={sectionId} aria-labelledby={headingId}>
      <h2 id={headingId} className="govuk-heading-l">
        {type === "specialist" ? "Specialist Comments" : "Public Comments"}
      </h2>
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <CommentCard key={index} />
        ))}
      </div>
    </section>
  );
}
