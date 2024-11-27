import { DprComment, DprCommentTypes, DprPagination } from "@/types";
import { CommentCard } from "@/components/CommentCard";
import "./CommentsList.scss";
import { Button } from "../Button";

export interface CommentsListProps {
  councilSlug: string;
  reference: string;
  comments: DprComment[] | null;
  pagination: Pick<DprPagination, "results" | "page">;
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
  const { results: resultsPerPage, page } = pagination;
  const startIndex = (page - 1) * resultsPerPage;
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
                    variant="blue"
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
