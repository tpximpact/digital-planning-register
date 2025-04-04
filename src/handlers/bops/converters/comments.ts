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

import { DprComment, DprPagination } from "@/types";
import { BopsComment, BopsSearchMetadata } from "../types";
import { convertDateTimeToUtc } from "@/util";

/**
 * Converts BOPS comments into our standard format (which RN is the same as BOPS!)
 * @todo some dates seem to be coming in without times!
 * @param comment
 * @returns
 */
export const convertCommentBops = (comment: BopsComment): DprComment => {
  return {
    id: comment.id,
    comment: comment.comment,
    receivedDate: convertDateTimeToUtc(comment.receivedAt),
    sentiment: comment.sentiment || "",
  };
};

export const convertBopsToDprPagination = (
  bopsPagination: BopsSearchMetadata,
): DprPagination => {
  return {
    resultsPerPage: bopsPagination.results,
    currentPage: bopsPagination.page,
    totalPages: bopsPagination.total_pages,
    totalItems: bopsPagination.total_results,
  };
};
