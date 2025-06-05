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
import { ApiResponse, DprDocument, DprDocumentsApiResponse } from "@/types";
import { Suspense } from "react";
import {
  DocumentsList,
  DocumentsListSkeleton,
} from "@/components/DocumentsList";

async function fetchData(
  councilSlug: string,
  reference: string,
  documentsToShow: number,
): Promise<ApiResponse<DprDocumentsApiResponse | null>> {
  const appConfig = getAppConfig(councilSlug);

  const response = await ApiV1.documents(
    appConfig.council?.dataSource ?? "none",
    councilSlug,
    reference,
    {
      page: 1,
      resultsPerPage: documentsToShow,
    },
  );

  return response;
}

export interface DocumentsListWithSuspenseProps {
  councilSlug: string;
  reference: string;
  documents?: DprDocument[] | null;
  totalDocuments?: number;
  documentsToShow: number;
}

/**
 * The CommentsListWithSuspense component:
 * - If comments are provided, it renders them directly.
 * - Otherwise, it uses Suspense with an async loader to fetch the comments.
 */
export function DocumentsListWithSuspense({
  councilSlug,
  reference,
  documentsToShow = 6,
  documents,
  totalDocuments,
}: DocumentsListWithSuspenseProps) {
  if (documents && totalDocuments) {
    return (
      <DocumentsList
        councilSlug={councilSlug}
        reference={reference}
        documents={documents}
        totalDocuments={totalDocuments}
        documentsToShow={documentsToShow}
      />
    );
  }

  // Otherwise, use the async loader wrapped in Suspense.
  return (
    <Suspense fallback={<DocumentsListSkeleton />}>
      <DocumentsListLoader
        councilSlug={councilSlug}
        reference={reference}
        documentsToShow={documentsToShow}
      />
    </Suspense>
  );
}

async function DocumentsListLoader({
  councilSlug,
  reference,
  documentsToShow,
}: {
  councilSlug: string;
  reference: string;
  documentsToShow: number;
}) {
  const response = await fetchData(councilSlug, reference, documentsToShow);

  return (
    <DocumentsList
      councilSlug={councilSlug}
      reference={reference}
      documents={response.data}
      totalDocuments={response.pagination?.totalResults ?? 0}
      documentsToShow={documentsToShow}
    />
  );
}
