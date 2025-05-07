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
"use client";
import { COMMENT_RESULTSPERPAGE_OPTIONS } from "@/lib/comments";
import { createPathFromParams } from "@/lib/navigation";
import { SearchParamsComments } from "@/types";
import { commentSearchFields } from "@/util/featureFlag";
import { useSearchParams } from "next/navigation";

export interface FormCommentsSearchProps {
  council: string;
  reference: string;
  searchParams: SearchParamsComments;
  action?: string;
}

export const FormCommentsSearch = ({
  council,
  reference,
  searchParams,
  action,
}: FormCommentsSearchProps) => {
  const urlSearchParams = useSearchParams() || new URLSearchParams();

  const clearFormQueryParams = new URLSearchParams(
    Array.from(urlSearchParams.entries()).filter(
      ([key]) => !commentSearchFields.includes(key),
    ),
  );

  const renderFormContent = () => (
    <>
      <h2 className="govuk-heading-m">Search comments</h2>
      <div className="govuk-grid-row">
        {commentSearchFields.includes("query") && (
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
                defaultValue={searchParams?.query ?? ""}
              />
            </div>
          </div>
        )}
        <div className="govuk-grid-row">
          {commentSearchFields.includes("query") && (
            <div className="govuk-grid-column-one-third">
              <div className="govuk-form-group">
                <label htmlFor="resultsPerPage" className="govuk-label">
                  Comments per page
                </label>
                <select
                  id="resultsPerPage"
                  name="resultsPerPage"
                  defaultValue={searchParams.resultsPerPage}
                  className="govuk-select drp-dropdown__select"
                >
                  {COMMENT_RESULTSPERPAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="govuk-grid-row govuk-!-margin-left-0 grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-full govuk-button-group">
            <button
              type="submit"
              className="govuk-button dpr-comment-filter__button"
            >
              Search
            </button>
            <a
              href={`${createPathFromParams({ council, reference }, "comments")}?${clearFormQueryParams.toString()}`}
              className="govuk-button govuk-button--secondary"
              role="button"
            >
              Clear search
            </a>
          </div>
        </div>
      </div>
    </>
  );

  return action ? (
    <form
      className="govuk-form"
      method="get"
      action={action}
      aria-label="Search comments"
    >
      {renderFormContent()}
    </form>
  ) : (
    renderFormContent()
  );
};
