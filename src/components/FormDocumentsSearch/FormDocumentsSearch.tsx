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
  DOCUMENT_RESULTSPERPAGE_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
} from "@/lib/documents";
import { SearchParamsDocuments } from "@/types";
import "./FormDocumentsSearch.scss";
import { FormFieldFromTo } from "@/components/FormFieldFromTo";
import { Button } from "@/components/button";
import { capitalizeFirstLetter, pascalToSentenceCase } from "@/util";
import { AppConfig } from "@/config/types";

export interface FormDocumentsSearchProps {
  searchParams: SearchParamsDocuments;
  appConfig: AppConfig;
  action?: string;
}

export const FormDocumentsSearch = ({
  searchParams,
  appConfig,
  action,
}: FormDocumentsSearchProps) => {
  const documentSearchFields = appConfig.features?.documentSearchFields ?? [];

  const renderFormContent = () => (
    <div className="dpr-form-documents-search">
      <h2 className="dpr-form-documents-search__title">Search documents</h2>
      <div className="dpr-form-documents-search__row">
        {documentSearchFields.includes("name") && (
          <div className="dpr-form-documents-search__column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="name" className="govuk-label">
                Name
              </label>
              <input
                name="name"
                className="govuk-input govuk-!-width-full"
                id="name"
                type="text"
                defaultValue={searchParams?.name ?? ""}
              />
            </div>
          </div>
        )}
        {documentSearchFields.includes("type") && (
          <div className="dpr-form-documents-search__column-one-third">
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="type">
                Document type
              </label>

              <select
                className="govuk-select govuk-!-width-full"
                id="type"
                name="type"
                defaultValue={searchParams?.type ?? ""}
              >
                <option value="">All</option>
                {DOCUMENT_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {capitalizeFirstLetter(
                      pascalToSentenceCase(option).replace(".", " - "),
                    )}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {documentSearchFields.includes("publishedAtFrom") &&
          documentSearchFields.includes("publishedAtTo") && (
            <div className="dpr-form-documents-search__column-one-third">
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
      </div>
      <div className="dpr-form-documents-search__row">
        {documentSearchFields.includes("resultsPerPage") && (
          <div className="dpr-form-documents-search__column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="resultsPerPage" className="govuk-label">
                Documents per page
              </label>
              <select
                id="resultsPerPage"
                name="resultsPerPage"
                defaultValue={searchParams.resultsPerPage}
                className="govuk-select govuk-!-width-full"
              >
                {DOCUMENT_RESULTSPERPAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="dpr-form-documents-search__row grid-row-extra-bottom-margin">
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
      aria-label="Search documents"
    >
      {renderFormContent()}
    </form>
  ) : (
    renderFormContent()
  );
};
