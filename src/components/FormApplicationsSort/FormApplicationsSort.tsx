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
import {
  DprApplicationOrderBy,
  DprApplicationSortBy,
  SearchParamsApplication,
} from "@/types";
import { Button } from "../button";
import { useState } from "react";
import "./FormApplicationsSort.scss";
import {
  APPLICATION_ORDERBY_DEFAULT,
  APPLICATION_ORDERBY_OPTIONS,
  APPLICATION_SORTBY_DEFAULT,
  APPLICATION_SORTBY_OPTIONS,
} from "@/lib/planningApplication/search";

export interface FormApplicationsSortProps {
  searchParams: SearchParamsApplication;
  action?: string;
}

export const FormApplicationsSort = ({
  searchParams,
  action,
}: FormApplicationsSortProps) => {
  const [sortBy, setSortBy] = useState(
    searchParams?.sortBy ?? APPLICATION_SORTBY_DEFAULT,
  );
  const [orderBy, setOrderBy] = useState(
    searchParams?.orderBy ?? APPLICATION_ORDERBY_DEFAULT,
  );
  const [sortByOrderBy, setSortByOrderBy] = useState(`${sortBy}_${orderBy}`);

  const applicationSortByOrderByOptions = [
    {
      label: "By received date",
      options: [
        {
          label: "Newest to oldest",
          sortBy: "receivedAt",
          orderBy: "desc",
        },
        {
          label: "Oldest to newest",
          sortBy: "receivedAt",
          orderBy: "asc",
        },
      ],
    },
    {
      label: "By council decision date",
      options: [
        {
          label: "Newest to oldest",
          sortBy: "councilDecisionDate",
          orderBy: "desc",
        },
        {
          label: "Oldest to newest",
          sortBy: "councilDecisionDate",
          orderBy: "asc",
        },
      ],
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newOrderBy] = e.target.value.split("_");

    if (
      APPLICATION_SORTBY_OPTIONS.includes(newSortBy as DprApplicationSortBy) &&
      APPLICATION_ORDERBY_OPTIONS.includes(newOrderBy as DprApplicationOrderBy)
    ) {
      setSortBy(newSortBy as DprApplicationSortBy);
      setOrderBy(newOrderBy as DprApplicationOrderBy);
    } else {
      setSortBy(APPLICATION_SORTBY_DEFAULT);
      setOrderBy(APPLICATION_ORDERBY_DEFAULT);
    }

    setSortByOrderBy(`${newSortBy}_${newOrderBy}`);
  };

  const renderFormContent = () => (
    <>
      <div className="dpr-form-applications-sort">
        <div className="dpr-form-applications-sort__row">
          <div className="dpr-form-applications-sort__column-one-third">
            <div className="govuk-form-group">
              <label htmlFor="applicationSortByorderBy" className="govuk-label">
                Sort by
              </label>
              <select
                id="applicationSortByorderBy"
                value={sortByOrderBy}
                onChange={handleChange}
                className="govuk-select govuk-!-width-full"
              >
                {applicationSortByOrderByOptions.map((option) => (
                  <optgroup label={option.label} key={option.label}>
                    {option.options.map((opt) => (
                      <option
                        key={opt.label}
                        value={`${opt.sortBy}_${opt.orderBy}`}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
          <div className="dpr-form-applications-sort__column-two-thirds govuk-!-padding-top-6">
            <input type="hidden" name="sortBy" defaultValue={sortBy} />
            <input type="hidden" name="orderBy" defaultValue={orderBy} />
            <Button variant="secondary" type="submit">
              Apply sorting
            </Button>
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
      aria-label="Sort applications"
    >
      {renderFormContent()}
    </form>
  ) : (
    renderFormContent()
  );
};
