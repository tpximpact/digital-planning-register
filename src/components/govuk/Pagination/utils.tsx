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

import { Page } from "./Pagination";

export const generatePaginationItems = (
  currentPage: number,
  totalPages: number,
): Page[] => {
  const pages: Page[] = [];
  const addPage = (number: number, current: boolean = false) => {
    pages.push({ current, number });
  };

  if (totalPages <= 1) {
    return pages;
  }
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  addPage(1, currentPage === 1);

  if (currentPage > 3) {
    addPage(-1); // Ellipsis
  }

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    addPage(i, currentPage === i);
  }

  if (currentPage < totalPages - 2) {
    addPage(-1); // Ellipsis
  }

  addPage(totalPages, currentPage === totalPages);

  return pages;
};
