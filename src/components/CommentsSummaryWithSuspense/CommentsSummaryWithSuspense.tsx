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

import { ApiV1 } from "@/actions/api";
import { Suspense } from "react";
import {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/CommentSummary";
import {
  CommentsSummary,
  CommentsSummarySkeleton,
} from "@/components/CommentsSummary";
import { CommentType } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentType";

export interface CommentsSummaryWithSuspenseProps {
  params: {
    council: string;
    reference: string;
  };
  type: CommentType;
  summary?: PublicCommentSummary | SpecialistCommentSummary;
}

/**
 * This component is used to display the comments summary for a specific application.
 * It can either use a pre-fetched summary or fetch it asynchronously if not provided.
 *
 * @param {CommentsSummaryWithSuspenseProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
export function CommentsSummaryWithSuspense({
  params,
  type,
  summary,
}: CommentsSummaryWithSuspenseProps) {
  if (summary) {
    return <CommentsSummary params={params} type={type} summary={summary} />;
  }

  // Otherwise, use the async loader wrapped in Suspense.
  return (
    <Suspense fallback={<CommentsSummarySkeleton type={type} />}>
      <CommentsSummaryLoader params={params} type={type} />
    </Suspense>
  );
}

async function CommentsSummaryLoader({
  params,
  type,
}: {
  params: {
    council: string;
    reference: string;
  };
  type: CommentType;
}) {
  const { council, reference } = params;

  const apiComments =
    type === "specialist" ? ApiV1.specialistComments : ApiV1.publicComments;

  const response = await apiComments("appConfig", council, reference, {
    page: 1,
    resultsPerPage: 0, // We only need the summary, not the full list of comments
    type,
  });

  const summary = response.data.summary;
  return <CommentsSummary params={params} type={type} summary={summary} />;
}
