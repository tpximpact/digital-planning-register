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

import { DprComment, DprCommentTypes, DprPagination } from "@/types";
import { CommentCard } from "@/components/CommentCard";
import "./CommentsList.scss";
import { Button } from "@/components/button";

export interface CommentsListProps {
  councilSlug: string;
  reference: string;
  comments: DprComment[] | null | undefined;
  pagination: Pick<DprPagination, "resultsPerPage" | "currentPage">;
  showMoreButton?: boolean;
  type?: DprCommentTypes;
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
  pagination,
  showMoreButton = false,
  type,
}: CommentsListProps) => {
  if (!pagination) {
    return null;
  }
  const { resultsPerPage, currentPage } = pagination;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedComments = comments?.slice(startIndex, endIndex);
  const totalComments = comments ? comments.length : 0;

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

      {displayedComments && displayedComments.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            {displayedComments.map((comment, i) => (
              <CommentCard
                key={i}
                comment={comment}
                commentNumber={startIndex + i + 1}
              />
            ))}
          </div>
          {showMoreButton && displayedComments.length >= resultsPerPage && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {displayedComments.length} of {totalComments} comments
                </p>
                {councilSlug && (
                  <Button
                    variant="information"
                    element="link"
                    href={`/${councilSlug}/${reference}/comments`}
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
