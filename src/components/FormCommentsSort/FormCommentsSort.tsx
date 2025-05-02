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

import { Button } from "../button/Button";
import "./FormCommentsSort.scss";

export interface FormCommentsSortProps {
  defaultOrderBy?: string;
  defaultSortBy?: string;
  council: string;
  reference: string;
  type: "public" | "specialist";
}

export const FormCommentsSort = ({
  defaultOrderBy = "desc",
  defaultSortBy = "receivedAt",
  council,
  reference,
  type = "public",
}: FormCommentsSortProps) => {
  return (
    <form
      className="govuk-form dpr-form-comments-sort"
      method="get"
      action={`/${council}/${reference}/comments`}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-m">Search comments</h2>
        </div>
        <div className="govuk-grid-row govuk-!-margin-left-0">
          <div className="govuk-grid-column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="sortOrder" className="govuk-label">
                Sort by
              </label>
              <select
                id="sortOrder"
                name="orderBy"
                defaultValue={defaultOrderBy}
                className="govuk-select dpr-form-comments-sort__select"
              >
                <option value="desc">Most recent to oldest</option>
                <option value="asc">Oldest to most recent</option>
              </select>
            </div>
          </div>
          <div className="govuk-grid-column-two-thirds govuk-!-padding-top-6">
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="sortBy" value={defaultSortBy} />
            <Button variant="secondary" type="submit">
              Apply sorting
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
