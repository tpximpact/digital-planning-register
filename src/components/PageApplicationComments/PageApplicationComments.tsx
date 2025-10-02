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
import { DprApplication, DprPagination, SearchParamsComments } from "@/types";
import { BackButton } from "@/components/BackButton";
import { Pagination } from "@/components/govuk/Pagination";
import { AppConfig } from "@/config/types";
import { ContentNotFound } from "@/components/ContentNotFound";
import { PageMain } from "@/components/PageMain";
import { createPathFromParams } from "@/lib/navigation";
import { FormCommentsSort } from "@/components/FormCommentsSort";
import { ContentNoResult } from "@/components/ContentNoResult";
import { FormCommentsSearch } from "@/components/FormCommentsSearch";
import { ContextSetterWithSuspense } from "@/components/ContextSetter";
import { SpecialistRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import { SpecialistCommentCard } from "../SpecialistCommentCard";
import React from "react";
import { PublicCommentCard } from "../PublicCommentCard";
import { PublicCommentRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/PublicComment.js";

export interface PageApplicationCommentsProps {
  params: {
    council: string;
    reference: string;
  };
  appConfig: AppConfig;
  application?: DprApplication;
  comments: SpecialistRedacted[] | PublicCommentRedacted[] | null;
  searchParams: SearchParamsComments;
  pagination?: DprPagination;
}

export const PageApplicationComments = ({
  params,
  appConfig,
  application,
  comments,
  pagination,
  searchParams,
}: PageApplicationCommentsProps) => {
  if (!appConfig || !appConfig.council || !pagination) {
    return (
      <PageMain>
        <ContentNotFound />
      </PageMain>
    );
  }
  const { council: councilSlug, reference } = params;
  const { type } = searchParams;
  return (
    <>
      <BackButton baseUrl={createPathFromParams(params)} />
      <PageMain>
        <ContextSetterWithSuspense
          councilSlug={councilSlug}
          reference={reference}
          application={application}
        />
        <h1 className="govuk-heading-l">
          {type === "public" ? "Public Comments" : "Specialist Comments"}
        </h1>

        {pagination?.totalAvailableItems === 0 ? (
          <p className="govuk-hint">
            <em>
              {type === "specialist"
                ? "No comments from specialists have been published at this time."
                : "No comments from the public have been published at this time."}
            </em>
          </p>
        ) : (
          <>
            <form
              className="govuk-form"
              method="get"
              action={createPathFromParams(params, "comments/search")}
              aria-label="Search & Sort comments"
            >
              <input type="hidden" name="type" value={type} />
              <input type="hidden" name="council" value={councilSlug} />
              <input type="hidden" name="reference" value={reference} />
              <FormCommentsSearch
                searchParams={searchParams}
                appConfig={appConfig}
              />
              <FormCommentsSort searchParams={searchParams} />
            </form>

            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>

            {comments && comments.length > 0 ? (
              comments.map((comment, i) => (
                <React.Fragment key={`${i}-${comment.id}`}>
                  {type === "specialist" ? (
                    <SpecialistCommentCard
                      key={`${i}-${comment.id}`}
                      params={params}
                      specialist={comment as SpecialistRedacted}
                    />
                  ) : (
                    <PublicCommentCard
                      key={`${i}-${comment.id}`}
                      comment={comment as PublicCommentRedacted}
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <ContentNoResult
                councilConfig={appConfig.council}
                type="comment"
              />
            )}

            {pagination.totalPages > 1 && (
              <Pagination
                baseUrl={createPathFromParams(params, "comments")}
                searchParams={searchParams}
                pagination={pagination}
              />
            )}
          </>
        )}
      </PageMain>
    </>
  );
};
