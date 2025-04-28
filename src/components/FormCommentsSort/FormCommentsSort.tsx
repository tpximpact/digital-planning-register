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

import "./FormCommentsSort.scss";

export interface FormCommentsSortProps {
  defaultOrderBy?: string;
  council: string;
  reference: string;
  type: "public" | "specialist";
  defaultSentiment?: string;
  defaultPublishedAtFrom?: string;
  defaultPublishedAtTo?: string;
}

export const FormCommentsSort = ({
  defaultOrderBy = "desc",
  council,
  reference,
  type,
  defaultSentiment = "all",
  defaultPublishedAtFrom,
  defaultPublishedAtTo,
}: FormCommentsSortProps) => {
  return (
    <form
      className="govuk-form dpr-comment-filter"
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
              <label htmlFor="sentiment" className="govuk-label">
                Sentiment
              </label>
              <select
                id="sentiment"
                name="sentiment"
                defaultValue={defaultSentiment}
                className="govuk-select drp-dropdown__select"
              >
                <option value="">All</option>
                <option value="objection">Opposed</option>
                <option value="supportive">Support</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
          </div>
        </div>
        <div className="govuk-grid-row govuk-!-margin-left-0">
          <div className="govuk-grid-column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="publishedDate" className="govuk-label">
                Published date
              </label>
              <input
                type="date"
                name="publishedAtFrom"
                className="govuk-input govuk-input--width-5"
                defaultValue={defaultPublishedAtFrom}
                title="Published at from"
                aria-label="Published at from"
              />
              <p className="govuk-body dpr-comment-filter__to-label">to</p>
              <input
                type="date"
                name="publishedAtTo"
                className="govuk-input govuk-input--width-5"
                defaultValue={defaultPublishedAtTo}
                title="Published at to"
                aria-label="Published at to"
              />
            </div>
          </div>
          <div className="govuk-grid-row govuk-!-margin-left-0 grid-row-extra-bottom-margin">
            <div className="govuk-grid-column-full govuk-button-group">
              <button
                type="submit"
                className="govuk-button govuk-button dpr-comment-filter__button"
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
        <div className="govuk-grid-row govuk-!-margin-left-0">
          <div className="govuk-grid-column-one-third dpr-dropdown">
            <div className="govuk-form-group drp-dropdown__group">
              <label htmlFor="sortOrder" className="govuk-label">
                Sort by
              </label>
              <select
                id="sortOrder"
                name="orderBy"
                defaultValue={defaultOrderBy}
                className="govuk-select drp-dropdown__select"
              >
                <option value="desc">Most recent to oldest</option>
                <option value="asc">Oldest to most recent</option>
              </select>
            </div>
          </div>
          <div className="govuk-grid-column-two-thirds govuk-!-padding-top-6">
            <input type="hidden" name="type" value={type} />
            <button
              type="submit"
              className="govuk-button govuk-button--secondary dpr-comment-filter__button"
            >
              Apply sorting
            </button>
          </div>
        </div>
      </div>
      <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--l" />
    </form>
  );
};
