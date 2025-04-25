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

import { SearchParams } from "@/types";

export interface FormCommentsSortProps {
  council: string;
  reference: string;
  type: "public" | "specialist";
  searchParams?: SearchParams;
}

export const FormCommentsSearch = ({
  council,
  reference,
  type = "public",
  searchParams,
}: FormCommentsSortProps) => {
  return (
    <form
      className="govuk-form dpr-comment-filter"
      method="get"
      aria-label="Search comments"
      action={`/${council}/${reference}/comments`}
    >
      <div>
        <h2 className="govuk-heading-m">Search comments</h2>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="query" className="govuk-label">
                Contents
              </label>
              <input
                name="query"
                className="govuk-input"
                id="query"
                type="text"
                defaultValue={searchParams?.query}
              />
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-third">
              <div className="govuk-form-group">
                <label htmlFor="resultsPerPage" className="govuk-label">
                  Comments per page
                </label>
                <select
                  id="resultsPerPage"
                  name="resultsPerPage"
                  defaultValue={searchParams?.resultsPerPage}
                  className="govuk-select drp-dropdown__select"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
          <div className="govuk-grid-row govuk-!-margin-left-0 grid-row-extra-bottom-margin">
            <input type="hidden" name="type" value={type} />
            <div className="govuk-grid-column-full govuk-button-group">
              <button
                type="submit"
                className="govuk-button dpr-comment-filter__button"
              >
                Search
              </button>
              <a
                href={`/${council}/${reference}/comments?type=${type}`}
                className="govuk-button govuk-button--secondary"
                role="button"
              >
                Clear search
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
