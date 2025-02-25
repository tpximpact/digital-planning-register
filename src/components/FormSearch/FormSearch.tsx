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
import "./FormSearch.scss";
import { Button } from "@/components/button";

export interface FormSearchProps {
  action: string;
  searchParams?: SearchParams;
}

export const FormSearch = ({ action, searchParams }: FormSearchProps) => {
  return (
    <form action={action} method="get" className="govuk-grid-row">
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
          />
        </div>
      </div>
      <div className="govuk-grid-column-one-quarter search-bar-buttons">
        <Button type="submit" element="button" variant="default">
          Search
        </Button>
      </div>
    </form>
  );
};
