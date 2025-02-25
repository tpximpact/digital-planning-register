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

import Link from "next/link";
import { Page } from "./Pagination";
import { SearchParams } from "@/types";

export interface PageItemProps {
  page: Page;
  link: string;
  searchParams?: SearchParams;
}

export const PageItem = ({ page, link, searchParams }: PageItemProps) => {
  return (
    <li
      className={`govuk-pagination__item ${page.current ? "govuk-pagination__item--current" : ""} ${page.number === -1 ? "govuk-pagination__item--ellipses" : ""}`}
    >
      {page.number === -1 ? (
        <>&#x022EF;</>
      ) : (
        <Link
          className="govuk-link govuk-pagination__link"
          href={{
            pathname: link,
            query: { ...searchParams, page: page.number },
          }}
          aria-label={`Page ${page.number}`}
          aria-current={page.current ? "page" : undefined}
        >
          {page.number}
        </Link>
      )}
    </li>
  );
};
