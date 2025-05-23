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
import { capitalizeFirstLetter } from "@/util";
import { pascalToSentenceCase } from "@/util/pascalToSentenceCase";
import Link from "next/link";

export interface ApplicationCommentsSummaryProps {
  type?: "public" | "specialist";
  summary?: PublicCommentSummary | SpecialistCommentSummary;
  reference: string;
  councilSlug: string;
}

export const renderHeaderContent = (
  summary: PublicCommentSummary | SpecialistCommentSummary,
  type: "public" | "specialist",
) => {
  if (type === "public") {
    return (
      <p className="govuk-heading-m">
        {summary.totalComments} comment{summary.totalComments !== 1 && "s"}{" "}
        received
      </p>
    );
  }

  const specialistSummary = summary as SpecialistCommentSummary;
  return (
    <>
      <p className="govuk-heading-m">
        {specialistSummary.totalConsulted} specialist
        {specialistSummary.totalConsulted !== 1 && "s"} contacted for
        consultation
      </p>
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
  if (!summary || !summary.sentiment) {
    return null;
  }

  const baseUrl = `/${councilSlug}/${reference}/comments?type=${type}`;
  return (
    <div id={`${type}-comments-summary`}>
      <h2 className="govuk-heading-l">{`${capitalizeFirstLetter(type)} Comments`}</h2>
      <>
        {renderHeaderContent(summary, type)}
        <ul className="govuk-list dpr-comment-summary__list">
          {Object.entries(summary.sentiment).map(([key, label]) => (
            <li key={key}>
              <Link href={`${baseUrl}}&sentiment=${key}`}>
                <SentimentIcon sentiment={key} />
                <span>
                  {label} {capitalizeFirstLetter(pascalToSentenceCase(key))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Button
          variant="information"
          href={`/${councilSlug}/${reference}/comments?type=${type}`}
        >
          {`View all ${summary.totalComments} ${type} comments`}
        </Button>
      </>
    </div>
  );
};
