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
  DprPagination,
  SearchParamsSpecialistComments,
} from "@/types";
import { BackButton } from "@/components/BackButton";
import { Pagination } from "@/components/govuk/Pagination";
import { AppConfig } from "@/config/types";

import { ContentNotFound } from "@/components/ContentNotFound";
import { PageMain } from "@/components/PageMain";
import { createPathFromParams } from "@/lib/navigation";

import { ContentNoResult } from "@/components/ContentNoResult";

import { ContextSetterWithSuspense } from "@/components/ContextSetter";
import { SpecialistDetailsCard } from "../SpecialistDetailsCard";
import { SpecialistRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import { SpecialistCommentCard } from "../SpecialistCommentCard";
import { FormSpecialistCommentsSort } from "../FormSpecialistCommentsSort";
import { specialistSearchFields } from "@/config/featureFlag";

export interface PageSpecialistCommentsProps {
  params: {
    council: string;
    reference: string;
    specialistId: number;
  };
  appConfig: AppConfig;
  application?: DprApplication;
  specialist: SpecialistRedacted;
  searchParams: SearchParamsSpecialistComments;
  pagination?: DprPagination;
}

export const PageSpecialistComments = ({
  params,
  appConfig,
  application,
  specialist,
  searchParams,
  pagination,
}: PageSpecialistCommentsProps) => {
  if (!appConfig || !appConfig.council) {
    return (
      <PageMain>
        <ContentNotFound />
      </PageMain>
    );
  }
  const { council: councilSlug, reference, specialistId } = params;
  return (
    <>
      <BackButton baseUrl={createPathFromParams(params)} />
      <PageMain>
        <ContextSetterWithSuspense
          councilSlug={councilSlug}
          reference={reference}
          application={application}
        />
        <h1 className="govuk-heading-l">View consultee responses</h1>

        <SpecialistDetailsCard specialist={specialist} />

        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>

        {specialistSearchFields.includes("sortBy") && (
          <form
            className="govuk-form"
            method="get"
            action={createPathFromParams(
              params,
              `specialist-comments/${params.specialistId}/search`,
            )}
            aria-label="Search & Sort comments"
          >
            <input type="hidden" name="council" value={councilSlug} />
            <input type="hidden" name="reference" value={reference} />
            <input type="hidden" name="specialistId" value={specialistId} />
            <FormSpecialistCommentsSort searchParams={searchParams} />
          </form>
        )}

        {pagination && pagination?.totalAvailableItems === 0 ? (
          <p className="govuk-hint">
            <em>
              No comments from this specialist have been published at this time.
            </em>
          </p>
        ) : (
          <>
            {specialist?.comments && specialist?.comments.length > 0 ? (
              specialist.comments.map((comment, i) => (
                <SpecialistCommentCard
                  key={`${i}-${comment.id}`}
                  params={params}
                  specialist={specialist}
                  comment={comment}
                />
              ))
            ) : (
              <ContentNoResult
                councilConfig={appConfig.council}
                type="comment"
              />
            )}

            {pagination && pagination.totalPages > 1 && (
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
