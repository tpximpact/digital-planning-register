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
  SearchParamsComments,
  ApiResponse,
  DprPublicCommentsApiResponse,
  DprSpecialistCommentsApiResponse,
  DprComment,
  DprCommentTypes,
  DprPagination,
} from "@/types";
import { Suspense } from "react";
import {
  CommentsList,
  CommentsListSkeleton,
} from "../CommentsList/CommentsList";

async function fetchData({
  params,
  searchParams,
}: {
  params: { council: string; reference: string };
  searchParams?: SearchParamsComments;
}): Promise<{
  response: ApiResponse<
    DprPublicCommentsApiResponse | DprSpecialistCommentsApiResponse | null
  >;
}> {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay

  const { reference, council } = params;
  const appConfig = getAppConfig(council);
  const response = await ApiV1.publicComments(
    appConfig.council?.dataSource ?? "none",
    council,
    reference,
    {
      ...searchParams,
      page: searchParams?.page ? Number(searchParams.page) : 1,
      resultsPerPage: searchParams?.resultsPerPage
        ? Number(searchParams.resultsPerPage)
        : appConfig.defaults.resultsPerPage,
    },
  );
  return { response };
}

export interface CommentsListWithSuspenseProps {
  councilSlug: string;
  reference: string;
  comments?: DprComment[] | null;
  type?: DprCommentTypes;
  pagination: Pick<DprPagination, "resultsPerPage" | "currentPage">;
  showMoreButton?: boolean;
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
  pagination,
  showMoreButton = false,
}: CommentsListWithSuspenseProps) {
  if (comments) {
    return (
      <CommentsList
        comments={comments}
        councilSlug={councilSlug}
        reference={reference}
        pagination={pagination}
        type={type}
        showMoreButton={showMoreButton}
      />
    );
  }

  // Otherwise, use the async loader wrapped in Suspense.
  return (
    <Suspense fallback={<CommentsListSkeleton />}>
      <CommentsListLoader
        reference={reference}
        pagination={pagination}
        type={type}
        showMoreButton={showMoreButton}
        council={councilSlug}
      />
    </Suspense>
  );
}

async function CommentsListLoader({
  council,
  reference,
  pagination,
  type,
  showMoreButton,
}: {
  council: string;
  reference: string;
  pagination: Pick<DprPagination, "resultsPerPage" | "currentPage">;
  type?: DprCommentTypes;
  showMoreButton?: boolean;
}) {
  const { response } = await fetchData({
    params: { council: council, reference },
    searchParams: {
      page: pagination.currentPage,
      resultsPerPage: pagination.resultsPerPage,
    },
  });
  const loadedComments: DprComment[] = response.data?.comments || [];
  console.log("I loaded comments from the loader");

  return (
    <CommentsList
      comments={loadedComments}
      councilSlug={council}
      reference={reference}
      pagination={pagination}
      type={type}
      showMoreButton={showMoreButton}
    />
  );
}
