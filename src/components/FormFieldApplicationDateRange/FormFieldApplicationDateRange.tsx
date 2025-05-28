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
import { SearchParamsApplication } from "@/types";
import "./FormFieldApplicationDateRange.scss";
import {
  APPLICATION_DATERANGE_OPTIONS,
  APPLICATION_DATETYPE_OPTIONS,
} from "@/lib/planningApplication/search";
import { FormFieldFromTo } from "@/components/FormFieldFromTo";
import { useState } from "react";

export interface FormFieldApplicationDateRangeProps {
  searchParams: SearchParamsApplication;
}

export const FormFieldApplicationDateRange = ({
  searchParams,
}: FormFieldApplicationDateRangeProps) => {
  const [show, setShow] = useState(searchParams?.dateRange === "fixed");
  return (
    <fieldset className="govuk-fieldset">
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
        Time period
      </legend>

      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="dateType">
          Date...
        </label>
        <select
          className="govuk-select"
          id="dateType"
          name="dateType"
          defaultValue={searchParams?.dateType ?? ""}
        >
          <option value="" disabled />
          {APPLICATION_DATETYPE_OPTIONS.map(
            (option: { value: string; label: string }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="govuk-form-group govuk-frontend-supported">
        <label className="govuk-label" htmlFor="dateRange">
          Date range
        </label>
        <div className="govuk-radios">
          {APPLICATION_DATERANGE_OPTIONS.map((option) => (
            <div key={option.value} className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id={option.value}
                name="dateRange"
                type="radio"
                value={option.value}
                {...(option.value === "fixed"
                  ? { "aria-controls": `conditional-${option.value}` }
                  : {})}
                defaultChecked={searchParams?.dateRange === option.value}
                onChange={() => setShow(option.value === "fixed")}
              />
              <label
                className="govuk-label govuk-radios__label"
                htmlFor={option.value}
              >
                {option.label}
              </label>
            </div>
          ))}
          <div
            className={`govuk-radios__conditional${!show ? " govuk-radios__conditional--hidden" : ""}`}
            id={`conditional-fixed`}
          >
            <FormFieldFromTo
              title="Date range"
              from={{
                label: "From date",
                name: "dateRangeFrom",
                value: searchParams?.dateRangeFrom,
              }}
              to={{
                label: "To date",
                name: "dateRangeTo",
                value: searchParams?.dateRangeTo,
              }}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};
