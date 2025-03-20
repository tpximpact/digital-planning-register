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
  SearchParams,
} from "@/types";
import { BackButton } from "@/components/BackButton";
import ApplicationHeader from "../application_header";
import { Pagination } from "@/components/govuk/Pagination";
import { AppConfig } from "@/config/types";
import { CommentsList } from "@/components/CommentsList";
import { ContentNotFound } from "../ContentNotFound";
import { PageMain } from "../PageMain";
import { createPathFromParams } from "@/lib/navigation";
import { getPropertyAddress } from "@/lib/planningApplication/application";

export interface PageApplicationCommentsProps {
  reference: string;
  application: DprApplication;
  comments: DprComment[] | null;
  appConfig: AppConfig;
  params?: {
    council: string;
    reference?: string;
  };
  type: DprCommentTypes;
  pagination?: DprPagination;
  searchParams?: SearchParams;
}

export const PageApplicationComments = ({
  reference,
  application,
  comments,
  appConfig,
  params,
  type,
  pagination,
  searchParams,
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
        <CommentsList
          councilSlug={appConfig.council.slug}
          reference={reference}
          type={type}
          comments={comments}
          pagination={
            pagination ?? {
              results: appConfig.defaults.resultsPerPage,
              page: 1,
            }
          }
        />
        {pagination && pagination.total_pages > 1 && (
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
