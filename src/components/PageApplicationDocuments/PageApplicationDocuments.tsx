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

import { BackButton } from "@/components/BackButton";
import ApplicationHeader from "../application_header";
import { Pagination } from "@/components/govuk/Pagination";
import {
  DprApplication,
  DprDocument,
  DprPagination,
  SearchParams,
} from "@/types";
import { AppConfig } from "@/config/types";
import { DocumentsList } from "@/components/DocumentsList";
import { PageMain } from "../PageMain";
import { createPathFromParams } from "@/lib/navigation";
import { getPropertyAddress } from "@/lib/planningApplication/application";

export interface PageApplicationDocumentsProps {
  reference: string;
  application: DprApplication;
  documents: DprDocument[] | null;
  pagination: DprPagination;
  appConfig: AppConfig;
  params?: {
    council: string;
    reference?: string;
  };
  searchParams?: SearchParams;
}

export const PageApplicationDocuments = ({
  reference,
  application,
  documents,
  pagination,
  appConfig,
  params,
  searchParams,
}: PageApplicationDocumentsProps) => {
  if (!appConfig || !appConfig.council) {
    return null;
  }
  const councilSlug = appConfig.council.slug;

  const documentsPagination = pagination ?? {
    currentPage: 1,
    resultsPerPage: searchParams?.resultsPerPage ?? 9,
    totalPages: 1,
    totalResults: documents?.length ?? 0,
    totalAvailableItems: documents?.length ?? 0,
  };

  const { currentPage, resultsPerPage } = documentsPagination;
  const from = (currentPage - 1) * resultsPerPage;
  const displayedDocuments = documents?.slice(from, from + resultsPerPage);

  const address = getPropertyAddress(
    application?.submission?.data?.property?.address,
  );
  return (
    <>
      <BackButton baseUrl={`/${councilSlug}/${reference}`} />
      <PageMain>
        <ApplicationHeader reference={reference} address={address} />
        <DocumentsList
          councilSlug={appConfig.council.slug}
          reference={reference}
          documents={displayedDocuments ?? null}
          totalDocuments={documents?.length ?? displayedDocuments?.length ?? 0}
          showMoreButton={false}
        />
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            baseUrl={createPathFromParams(params, "documents")}
            searchParams={searchParams}
            pagination={pagination}
          />
        )}
      </PageMain>
    </>
  );
};
