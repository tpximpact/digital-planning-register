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
import { getAppConfig } from "@/config";
import {
  ApiResponse,
  DprPublicCommentsApiResponse,
  DprSpecialistCommentsApiResponse,
  DprComment,
  DprCommentTypes,
} from "@/types";
import { Suspense } from "react";
import {
  CommentsList,
  CommentsListSkeleton,
} from "../CommentsList/CommentsList";
async function fetchData({
  params,
  type,
}: {
  params: { council: string; reference: string };
  type?: DprCommentTypes;
}): Promise<{
  response: ApiResponse<
    DprPublicCommentsApiResponse | DprSpecialistCommentsApiResponse | null
  >;
}> {
  const { reference, council } = params;
  const appConfig = getAppConfig(council);

  const commentsApi =
    type === "specialist" ? ApiV1.specialistComments : ApiV1.publicComments;

  const response = await commentsApi(
    appConfig.council?.dataSource ?? "none",
    council,
    reference,
  );

  return { response };
}

export interface CommentsListWithSuspenseProps {
  councilSlug: string;
  reference: string;
  comments?: DprComment[] | null;
  type?: DprCommentTypes;
  resultsPerPage?: number;
}

/**
 * The CommentsListWithSuspense component:
 * - If comments are provided, it renders them directly.
 * - Otherwise, it uses Suspense with an async loader to fetch the comments.
 */
export function CommentsListWithSuspense({
  councilSlug,
  reference,
  comments,
  type,
  resultsPerPage,
}: CommentsListWithSuspenseProps) {
  if (comments) {
    return (
      <CommentsList
        comments={comments}
        councilSlug={councilSlug}
        reference={reference}
        type={type}
        resultsPerPage={resultsPerPage}
      />
    );
  }

  // Otherwise, use the async loader wrapped in Suspense.
  return (
    <Suspense fallback={<CommentsListSkeleton type={type} />}>
      <CommentsListLoader
        reference={reference}
        type={type}
        council={councilSlug}
        resultsPerPage={resultsPerPage}
      />
    </Suspense>
  );
}

async function CommentsListLoader({
  council,
  reference,
  type,
  resultsPerPage,
}: {
  council: string;
  reference: string;
  type?: DprCommentTypes;
  resultsPerPage?: number;
}) {
  const { response } = await fetchData({
    params: { council, reference },
    type,
  });
  const summary = response.data?.summary;
  const loadedComments: DprComment[] = response.data?.comments || [];
  return (
    <CommentsList
      summary={summary}
      comments={loadedComments}
      councilSlug={council}
      reference={reference}
      type={type}
      resultsPerPage={resultsPerPage}
    />
  );
}
