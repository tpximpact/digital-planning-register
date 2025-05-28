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

import { SearchParamsApplication } from "@/types";
import "./FormSearch.scss";
import { Button } from "@/components/button";
import { createPathFromParams } from "@/lib/navigation";
import { Details } from "@/components/govukDpr/Details";
import { APPLICATION_DPR_FILTER_OPTIONS } from "@/lib/planningApplication/search";
import { capitalizeFirstLetter, pascalToSentenceCase } from "@/util";
import Link from "next/link";
import { applicationSearchFields } from "@/util/featureFlag";

export interface FormSearchProps {
  params: {
    council: string;
  };
  action?: string;
  searchParams?: SearchParamsApplication;
}

export const FormSearch = ({
  params,
  action,
  searchParams,
}: FormSearchProps) => {
  const renderFormContent = () => (
    <>
      <div className="govuk-grid-row dpr-form-search">
        <div className="govuk-grid-column-one-half">
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="query">
              Search by application reference, address or description
            </label>
            <input
              className="govuk-input"
              id="query"
              name="query"
              type="text"
              defaultValue={searchParams?.query || ""}
              autoComplete="on"
              required={true}
            />
          </div>
        </div>
        <div className="govuk-grid-column-one-half dpr-form-search__actions">
          <div className="govuk-button-group">
            <Button type="submit" element="button" variant="default">
              Search
            </Button>
            {applicationSearchFields.includes("advancedSearch") && (
              <Button
                element="link"
                href={`${createPathFromParams(params, `search`)}`}
                variant="secondary"
              >
                Advanced search
              </Button>
            )}
          </div>
        </div>
      </div>
      {applicationSearchFields.includes("quickFilters") && (
        <Details
          summaryText="Quick filters"
          text={<QuickFilters params={params} searchParams={searchParams} />}
          open={!!searchParams?.dprFilter}
        />
      )}
    </>
  );

  return action ? (
    <form
      className="govuk-form"
      method="get"
      action={action}
      aria-label="Sort applications"
    >
      <input type="hidden" name="council" value={params.council} />
      {renderFormContent()}
    </form>
  ) : (
    renderFormContent()
  );
};

const QuickFilters = ({ params, searchParams }: FormSearchProps) => {
  const activeFilter = searchParams?.dprFilter;
  return (
    <>
      <div className="govuk-button-group">
        {APPLICATION_DPR_FILTER_OPTIONS.map((option) => (
          <Button
            key={option}
            element="link"
            href={`${createPathFromParams(params)}?dprFilter=${option}`}
            variant={option === activeFilter ? "primary" : "secondary"}
          >
            {option === activeFilter && <>&#10004;&nbsp;</>}
            {capitalizeFirstLetter(pascalToSentenceCase(option))}
          </Button>
        ))}
      </div>
      {activeFilter && (
        <p>
          <Link
            href={`${createPathFromParams(params)}`}
            className="govuk-link govuk-link--no-visited-state"
          >
            &#10006;&nbsp;Clear quick filters
          </Link>
        </p>
      )}
    </>
  );
};
