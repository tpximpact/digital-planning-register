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

import {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/CommentSummary";

import { SentimentIcon } from "@/components/SentimentIcon";
import { Button } from "@/components/button";

import { capitalizeFirstLetter, pascalToSentenceCase } from "@/util";
import { createPathFromParams } from "@/lib/navigation";

import Link from "next/link";
import "./CommentsSummary.scss";
import { CommentType } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentType";

export interface CommentsSummaryProps {
  params: {
    council: string;
    reference: string;
  };
  type: CommentType;
  summary: PublicCommentSummary | SpecialistCommentSummary;
}

export const CommentsSummary = ({
  params,
  type,
  summary,
}: CommentsSummaryProps) => {
  if (!type || !summary.sentiment) {
    return null;
  }

  const isSpecialistSummary = (
    summary: PublicCommentSummary | SpecialistCommentSummary,
  ): summary is SpecialistCommentSummary => {
    return "totalConsulted" in summary;
  };

  const baseUrl = `${createPathFromParams(params, "comments")}?type=${type}`;
  return (
    <div className="dpr-comment-summary" id={`${type}-comments-summary`}>
      <h2 className="govuk-heading-l">{`${capitalizeFirstLetter(type)} Comments`}</h2>
      {summary.totalComments === 0 ? (
        <p className="govuk-hint">
          <em>
            {type === "specialist"
              ? "No comments from specialists have been published at this time."
              : "No comments from the public have been published at this time."}
          </em>
        </p>
      ) : (
        <>
          <div className="dpr-comment-summary__header">
            {type === "public" && (
              <p className="govuk-heading-m">
                {`${summary.totalComments} comment${summary.totalComments !== 1 ? "s" : ""} received`}
              </p>
            )}

            {type === "specialist" && isSpecialistSummary(summary) && (
              <>
                <p className="govuk-heading-m">
                  {`${summary.totalConsulted} specialist${summary.totalConsulted !== 1 ? "s" : ""} contacted for consultation`}
                </p>
                <p className="govuk-body">
                  {`${Math.max(0, summary.totalConsulted - summary.totalComments)} yet to respond`}
                </p>
              </>
            )}
          </div>
          <ul className="govuk-list dpr-comment-summary__list">
            {Object.entries(summary.sentiment).map(([key, label]) => (
              <li key={key}>
                {summary.totalComments > 0 && (
                  <Link
                    href={`${baseUrl}&sentiment=${key}`}
                    className="dpr-comment-summary__list-link"
                  >
                    <SentimentIcon sentiment={key} />
                    <span>
                      {`${label} ${capitalizeFirstLetter(pascalToSentenceCase(key))}`}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Button element="link" variant="information" href={baseUrl}>
            {`View ${summary.totalComments > 1 ? `all ${summary.totalComments}` : ""} ${type} comments`}
          </Button>
        </>
      )}
    </div>
  );
};
