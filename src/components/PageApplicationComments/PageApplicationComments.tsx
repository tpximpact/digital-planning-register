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
"use client";
import {
  DprApplication,
  DprComment,
  DprCommentTypes,
  DprPagination,
  SearchParamsComments,
} from "@/types";
import { BackButton } from "@/components/BackButton";
import ApplicationHeader from "../application_header";
import { Pagination } from "@/components/govuk/Pagination";
import { AppConfig } from "@/config/types";
import { CommentCard } from "@/components/CommentCard";
import { ContentNotFound } from "../ContentNotFound";
import { PageMain } from "../PageMain";
import { createPathFromParams } from "@/lib/navigation";
import { ApiV1 } from "@/actions/api";
import { CommentFilter } from "@/components/CommentFilter";
import { useEffect, useState } from "react";
import { getPropertyAddress } from "@/lib/planningApplication/application";

export interface PageApplicationCommentsProps {
  reference: string;
  application: DprApplication;
  appConfig: AppConfig;
  params?: {
    council: string;
    reference: string;
  };
  type: DprCommentTypes;
  pagination?: DprPagination;
  searchParams?: SearchParamsComments;
  orderBy?: string;
}

export type OrderBy = "asc" | "desc";

export const PageApplicationComments = ({
  reference,
  application,
  appConfig,
  params,
  type,
  pagination,
  searchParams,
}: PageApplicationCommentsProps) => {
  const [orderBy, setOrderBy] = useState<string>("desc");
  const [comments, setComments] = useState<DprComment[]>([]);

  useEffect(() => {
    const refetch = async () => {
      if (!params) return;
      const { council, reference } = params;
      const apiComments =
        type === "specialist" ? ApiV1.specialistComments : ApiV1.publicComments;
      const response = await apiComments(
        appConfig.council?.dataSource ?? "none",
        council,
        reference,
        {
          ...searchParams,
          page: searchParams?.page ?? 1,
          resultsPerPage: appConfig.defaults.resultsPerPage ?? 10,
          orderBy,
        },
      );
      setComments(response?.data?.comments ?? []);
    };
    refetch();
  }, [
    appConfig.council?.dataSource,
    appConfig.defaults.resultsPerPage,
    orderBy,
    params,
    searchParams,
    type,
  ]);

  if (!appConfig || !appConfig.council) {
    return (
      <PageMain>
        <ContentNotFound />
      </PageMain>
    );
  }
  const councilSlug = appConfig.council.slug;
  const address = getPropertyAddress(
    application?.submission?.data?.property?.address,
  );

  return (
    <>
      <BackButton baseUrl={`/${councilSlug}/${reference}`} />
      <PageMain>
        <ApplicationHeader reference={reference} address={address} />
        <CommentFilter setOrderBy={setOrderBy} />
        {comments && comments.length > 0 ? (
          <>
            {comments.map((comment, index) => (
              <CommentCard
                key={comment.receivedDate}
                comment={comment}
                commentNumber={index + 1}
              />
            ))}
          </>
        ) : (
          <ContentNotFound />
        )}
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            baseUrl={createPathFromParams(params, "comments")}
            searchParams={searchParams}
            pagination={pagination}
          />
        )}
      </PageMain>
    </>
  );
};
