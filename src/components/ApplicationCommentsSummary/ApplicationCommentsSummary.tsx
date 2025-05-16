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
import { SentimentIcon } from "../SentimentIcon";
import "./ApplicationCommentsSummary.scss";
import { Button } from "../button";
import { SummarySkeleton } from "./ApplicationCommentsSummarySkeleton";
import { capitalizeFirstLetter } from "@/util";

export interface ApplicationCommentsSummaryProps {
  type?: "public" | "specialist";
  summary?: PublicCommentSummary | SpecialistCommentSummary;
  reference: string;
  councilSlug: string;
}

type PublicSentimentKey = "supportive" | "objection" | "neutral";
type SpecialistSentimentKey = "approved" | "amendmentsNeeded" | "objected";

const sentimentLabels = {
  public: {
    supportive: "support",
    objection: "opposed",
    neutral: "neutral",
  } as Record<PublicSentimentKey, string>,

  specialist: {
    approved: "approve",
    amendmentsNeeded: "amendments needed",
    objected: "objected",
  } as Record<SpecialistSentimentKey, string>,
};

export const renderHeaderContent = (
  summary: PublicCommentSummary | SpecialistCommentSummary,
  type: "public" | "specialist",
) => {
  if (type === "public") {
    return (
      <h3 className="govuk-heading-m">
        {summary.totalComments} comment{summary.totalComments !== 1 && "s"}{" "}
        received
      </h3>
    );
  }

  const specialistSummary = summary as SpecialistCommentSummary;
  return (
    <>
      <h3 className="govuk-heading-m">
        {specialistSummary.totalConsulted} specialist
        {specialistSummary.totalConsulted !== 1 && "s"} contacted for
        consultation
      </h3>
      <p className="govuk-body">
        {specialistSummary.totalConsulted - specialistSummary.totalComments} yet
        to respond
      </p>
    </>
  );
};
export const ApplicationCommentsSummary = ({
  summary,
  type = "public",
  reference,
  councilSlug,
}: ApplicationCommentsSummaryProps) => {
  if (!summary) return null;

  const labels = sentimentLabels[type];
  const sentiments = summary.sentiment as Record<string, number>;

  return (
    <div id={`${type}-comments-summary`}>
      <h2 className="govuk-heading-l">{`${capitalizeFirstLetter(type)} Comments`}</h2>
      {sentiments ? (
        <>
          {renderHeaderContent(summary, type)}
          {Object.entries(labels).map(([key, label]) => (
            <p key={key} className="govuk-body">
              <Button
                element="link"
                variant="text-only"
                href={`/${councilSlug}/${reference}/comments?type=${type === "public" ? "public" : "specialist"}&sentiment=${key}`}
                className="govuk-link dpr-comment-summary-link"
              >
                <SentimentIcon sentiment={key} />
                {sentiments[key] ?? 0} {label}
              </Button>
            </p>
          ))}
          <Button
            variant="information"
            href={`/${councilSlug}/${reference}/comments?type=${type}`}
          >
            {`View all ${summary.totalComments} ${type} comments`}
          </Button>
        </>
      ) : (
        <SummarySkeleton type={type} />
      )}
    </div>
  );
};
