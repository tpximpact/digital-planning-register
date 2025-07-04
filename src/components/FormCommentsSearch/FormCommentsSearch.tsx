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
import {
  COMMENT_PUBLIC_SENTIMENT_OPTIONS,
  COMMENT_PUBLIC_TOPIC_OPTIONS,
  COMMENT_RESULTSPERPAGE_OPTIONS,
  COMMENT_SPECIALIST_SENTIMENT_OPTIONS,
} from "@/lib/comments";
import { SearchParamsComments } from "@/types";
import "./FormCommentsSearch.scss";
import { FormFieldFromTo } from "../FormFieldFromTo";
import { Button } from "../button";
import { AppConfig } from "@/config/types";

export interface FormCommentsSearchProps {
  searchParams: SearchParamsComments;
  appConfig: AppConfig;
  action?: string;
}

export const FormCommentsSearch = ({
  searchParams,
  appConfig,
  action,
}: FormCommentsSearchProps) => {
  const { type } = searchParams;

  const commentSearchFields = appConfig.features?.commentSearchFields ?? [];

  const sentimentFields = () => (
    <div className="dpr-form-comments-search__column-one-third">
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="sentiment">
          Sentiment
        </label>
        <select
          className="govuk-select govuk-!-width-full"
          id="sentiment"
          name="sentiment"
          defaultValue={searchParams?.sentiment ?? ""}
        >
          <option value="">All</option>
          {type === "public" && (
            <>
              {COMMENT_PUBLIC_SENTIMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
          {type === "specialist" && (
            <>
              {COMMENT_SPECIALIST_SENTIMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </div>
  );

  const renderFormContent = () => (
    <div className="dpr-form-comments-search">
      <h2 className="dpr-form-comments-search__title">Search comments</h2>
      <div className="dpr-form-comments-search__row">
        {commentSearchFields.includes("query") && (
          <div className="dpr-form-comments-search__column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="query" className="govuk-label">
                Contents
              </label>
              <input
                name="query"
                className="govuk-input govuk-!-width-full"
                id="query"
                type="text"
                defaultValue={searchParams?.query ?? ""}
              />
            </div>
          </div>
        )}

        {/* @TODO get rid of this when both sentimentsare done  */}
        {type === "public" &&
          commentSearchFields.includes("sentiment") &&
          sentimentFields()}
        {type === "specialist" &&
          commentSearchFields.includes("sentimentSpecialist") &&
          sentimentFields()}

        {type === "public" && commentSearchFields.includes("topic") && (
          <div className="dpr-form-comments-search__column-one-third">
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="topic">
                Topic
              </label>

              <select
                className="govuk-select govuk-!-width-full"
                id="topic"
                name="topic"
                defaultValue={searchParams?.topic ?? ""}
              >
                <option value="">All</option>

                {COMMENT_PUBLIC_TOPIC_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="dpr-form-comments-search__row">
        {commentSearchFields.includes("publishedAtFrom") &&
          commentSearchFields.includes("publishedAtTo") && (
            <div className="dpr-form-comments-search__column-one-third">
              <FormFieldFromTo
                title="Published date"
                from={{
                  label: "Published from date",
                  name: "publishedAtFrom",
                  value: searchParams?.publishedAtFrom,
                }}
                to={{
                  label: "Published to date",
                  name: "publishedAtTo",
                  value: searchParams?.publishedAtTo,
                }}
              />
            </div>
          )}
        {commentSearchFields.includes("query") && (
          <div className="dpr-form-comments-search__column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="resultsPerPage" className="govuk-label">
                Comments per page
              </label>
              <select
                id="resultsPerPage"
                name="resultsPerPage"
                defaultValue={searchParams.resultsPerPage}
                className="govuk-select govuk-!-width-full"
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
      <div className="dpr-form-comments-search__row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-full govuk-button-group">
          <Button type="submit" variant="primary" name="action" value="submit">
            Search
          </Button>
          <Button type="submit" variant="secondary" name="action" value="clear">
            Clear search
          </Button>
        </div>
      </div>
    </div>
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
