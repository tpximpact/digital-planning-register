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
import { FormCommentsSort } from "@/components/FormCommentsSort";
import { getPropertyAddress } from "@/lib/planningApplication/application";

export interface PageApplicationCommentsProps {
  reference: string;
  application: DprApplication;
  comments: DprComment[] | null;
  appConfig: AppConfig;
  params: {
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
  comments,
}: PageApplicationCommentsProps) => {
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
        <h1 className="govuk-heading-l">
          {type === "public" ? "Public Comments" : "Specialist Comments"}
        </h1>
        <FormCommentsSort
          council={councilSlug}
          reference={reference}
          defaultOrderBy={searchParams?.orderBy}
          type={type}
        />
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
