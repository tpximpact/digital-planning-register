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

import { DprDocument, DprPagination, SearchParams } from "@/types";
import { createItemPagination } from "./pagination";

export const buildDocumentData = (
  documents: DprDocument[],
  searchParams?: SearchParams,
) => {
  const totalDocuments = documents ? documents.length : 0;
  const currentPage = Number(searchParams?.page ?? 1);
  const maxDisplayDocuments = searchParams?.resultsPerPage ?? 9;
  const documentData: { pagination: DprPagination; data: DprDocument[] } = {
    pagination: {
      ...createItemPagination(totalDocuments, currentPage, maxDisplayDocuments),
    },
    data: documents ? [...documents] : [],
  };
  return documentData;
};
