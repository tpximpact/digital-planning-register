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
import { Pagination } from "@/components/govuk/Pagination";
import {
  DprApplication,
  DprDocument,
  DprPagination,
  SearchParamsDocuments,
} from "@/types";
import { AppConfig } from "@/config/types";
import { FileList } from "@/components/FileList";
import { PageMain } from "@/components/PageMain";
import { createPathFromParams } from "@/lib/navigation";
import { ContextSetterWithSuspense } from "@/components/ContextSetter";
import { ContentNotFound } from "@/components/ContentNotFound";
import { FormDocumentsSearch } from "@/components/FormDocumentsSearch";
import { FormDocumentsSort } from "@/components/FormDocumentsSort";
import { ContentNoResult } from "@/components/ContentNoResult";
import { documentSearchFields } from "@/util/featureFlag";

export interface PageApplicationDocumentsProps {
  params: {
    council: string;
    reference: string;
  };
  appConfig: AppConfig;
  documents: DprDocument[] | null;
  searchParams: SearchParamsDocuments;
  pagination?: DprPagination;
  application?: DprApplication;
}

export const PageApplicationDocuments = ({
  params,
  appConfig,
  documents,
  searchParams,
  pagination,
  application,
}: PageApplicationDocumentsProps) => {
  if (!appConfig || !appConfig.council || !pagination) {
    return (
      <PageMain>
        <ContentNotFound />
      </PageMain>
    );
  }
  const { council: councilSlug, reference } = params;

  return (
    <>
      <BackButton baseUrl={createPathFromParams(params)} />
      <PageMain>
        <ContextSetterWithSuspense
          councilSlug={councilSlug}
          reference={reference}
          application={application}
        />
        <h1 className="govuk-heading-l" id="documents">
          Documents
        </h1>
        {pagination?.totalAvailableItems === 0 ? (
          <p className="govuk-hint">
            <em>No documents have been published at this time.</em>
          </p>
        ) : (
          <>
            <p className="govuk-body">
              To find out more detailed information, please read the following
              document(s) provided by the applicant.
            </p>
            <form
              className="govuk-form"
              method="get"
              action={createPathFromParams(params, "documents/search")}
              aria-label="Search & Sort documents"
            >
              <input type="hidden" name="council" value={councilSlug} />
              <input type="hidden" name="reference" value={reference} />
              <FormDocumentsSearch searchParams={searchParams} />
              {documentSearchFields.includes("sortBy") && (
                <FormDocumentsSort searchParams={searchParams} />
              )}
            </form>
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>

            {documents ? (
              <FileList documents={documents} />
            ) : (
              <ContentNoResult
                councilConfig={appConfig.council}
                type="comment"
              />
            )}

            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--invisible"></hr>
            {pagination.totalPages > 1 && (
              <Pagination
                baseUrl={createPathFromParams(params, "documents")}
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
