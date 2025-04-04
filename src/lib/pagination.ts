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

import { DprPagination } from "@/types";

/**
 * Since comments and documents aren't officially paginated we're faking it atm so
 * that the <Pagination /> component can be standardised
 * @param totalComments
 * @param currentPage
 * @returns
 */

export const createItemPagination = (
  totalItems: number = 0,
  paramsPage: number = 1,
  maxDisplayItems: number = 10,
): DprPagination => {
  const currentPage = Number(paramsPage);
  const totalPages = Math.ceil(totalItems / maxDisplayItems);

  return {
    resultsPerPage: maxDisplayItems,
    currentPage: currentPage,
    totalPages: totalPages,
    totalItems: totalItems,
  };
};
