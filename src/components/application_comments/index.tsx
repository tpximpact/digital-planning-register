// /path/to/ApplicationComments.tsx
import React from "react";
import { CommentCard } from "../comment_card";
import config from "../../../util/config.json";
import { Config, DprComment } from "@/types";
import { sortComments } from "@/lib/comments";

export interface ApplicationCommentsProps {
  council: string;
  reference: string;
  type: "consultee" | "published";
  comments?: DprComment[];
  maxDisplayComments?: number;
  showViewAllButton?: boolean;
  totalComments?: number;
  currentPage?: number;
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
  reference,
  type,
  maxDisplayComments = 10,
  showViewAllButton = true,
  totalComments = 0,
  currentPage = 0,
  council,
}: ApplicationCommentsProps) => {
  const displayedComments = comments.slice(0, maxDisplayComments);
  const councilConfig: Config = config;
  const publicComments = councilConfig[council]?.publicComments ?? false;
  const specialistComments =
    councilConfig[council]?.specialistComments ?? false;

  const commentTypeLabel =
    type === "consultee" ? "professional consultee" : "neighbour";
  const noCommentsMessage = getNoCommentMessage(
    type,
    publicComments,
    specialistComments,
  );

  comments = sortComments(comments);

  return (
    <>
      <h1 className="govuk-heading-l">
        {getTitle(type, publicComments, specialistComments)}
      </h1>
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
                  href={`/${council}/${reference}/comments?type=${type}`}
                  role="button"
                  className="govuk-button govuk-button--secondary blue-button"
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
