// /path/to/ApplicationComments.tsx
import React from "react";
import { ApplicationComment, Data } from "../../../util/type";
import { CommentCard } from "../comment_card";
import config from "../../../util/config.json";

interface ApplicationCommentsProps extends Data {
  comments?: ApplicationComment[];
  id: number;
  type: "consultee" | "published";
  maxDisplayComments?: number;
  showViewAllButton?: boolean;
  totalComments?: number;
  currentPage?: number;
  council: string;
}

export function getTitle(
  type: string,
  publicComments: boolean,
  specialistComments: boolean,
) {
  const titleRes: { [key: string]: string } = {
    consultee: "Specialist Comments",
    published: "Public Comments",
  };
  if (type === "consultee" && specialistComments) {
    return titleRes[type];
  }
  if (type === "published" && publicComments) {
    return titleRes[type];
  }
}

export function getNoCommentMessage(
  type: string,
  publicComments: boolean,
  specialistComments: boolean,
) {
  const noMessage: { [key: string]: string } = {
    consultee: "No comments from specialists have been published at this time.",
    published: "No comments from the public have been published at this time.",
  };
  if (type === "consultee" && specialistComments) {
    return noMessage[type];
  }
  if (type === "published" && publicComments) {
    return noMessage[type];
  }
}

const ApplicationComments = ({
  comments = [],
  id,
  type,
  maxDisplayComments = 10,
  showViewAllButton = true,
  totalComments = 0,
  currentPage = 0,
  council,
}: ApplicationCommentsProps) => {
  const displayedComments = comments.slice(0, maxDisplayComments);
  const councilConfig = config as any;
  const publicComments = councilConfig[council]?.publicComments;
  const specialistComments = councilConfig[council]?.specialistComments;

  const commentTypeLabel =
    type === "consultee" ? "professional consultee" : "neighbour";
  const noCommentsMessage = getNoCommentMessage(
    type,
    publicComments,
    specialistComments,
  );

  return (
    <>
      <h2 className="govuk-heading-l">
        {getTitle(type, publicComments, specialistComments)}
      </h2>
      {comments.length > 0 &&
      ((type === "consultee" && specialistComments) ||
        (type === "published" && publicComments)) ? (
        <>
          <div>
            {displayedComments.map((comment, index) => (
              <CommentCard
                key={index}
                comment={comment}
                commentNumber={
                  totalComments - (currentPage * maxDisplayComments + index)
                }
              />
            ))}
          </div>
          {showViewAllButton && totalComments > maxDisplayComments && (
            <div className="govuk-grid-row grid-row-extra-bottom-margin">
              <div className="govuk-grid-column-full">
                <p className="govuk-hint">
                  Showing {""}
                  {Math.min(
                    (currentPage + 1) * maxDisplayComments,
                    totalComments,
                  )}{" "}
                  of {totalComments} comments
                </p>
                <a
                  href={`/${council}/${id}/comments?type=${type}`}
                  role="button"
                  className="govuk-button govuk-button--primary"
                  data-module="govuk-button"
                >
                  Show all {totalComments} {commentTypeLabel} comments
                </a>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-hint">
              <em>{noCommentsMessage}</em>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationComments;
