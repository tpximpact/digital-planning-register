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

export interface ApplicationCommentsSummaryProps {
  type: "public" | "specialist";
  summary: PublicCommentSummary | SpecialistCommentSummary;
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

export const ApplicationCommentsSummary = ({
  summary,
  type,
}: ApplicationCommentsSummaryProps) => {
  if (!summary) return null;

  const labels = sentimentLabels[type];
  const sentiments = summary.sentiment as Record<string, number>;

  return (
    <div>
      {Object.entries(labels).map(([key, label]) => (
        <p key={key}>
          <SentimentIcon sentiment={key} />
          {sentiments[key] ?? 0} {label}
        </p>
      ))}
    </div>
  );
};

// PUBLIC COMMENT SUMMARY
// supportive: number;
// objection: number;
// neutral: number;

// SPECIALIST
// approved: number;
// amendmentsNeeded: number;
// objected: number;
