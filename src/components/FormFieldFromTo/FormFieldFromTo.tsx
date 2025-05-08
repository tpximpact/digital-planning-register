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

import "./FormFieldFromTo.scss";

type FieldProps = {
  label: string;
  name: string;
  id?: string;
  value?: string;
};

export interface FormFieldFromToProps {
  title: string;
  from: FieldProps;
  to: FieldProps;
}

export const FormFieldFromTo = ({ title, from, to }: FormFieldFromToProps) => {
  return (
    <fieldset className="govuk-fieldset dpr-form-field-from-to">
      <legend className="govuk-fieldset__legend">{title}</legend>
      <div className="dpr-form-field-from-to__fields">
        <div className="govuk-form-group">
          <label
            className="govuk-label govuk-visually-hidden"
            htmlFor={from.id ?? from.name}
          >
            {from.label}
          </label>
          <input
            className="govuk-input govuk-!-width-full"
            step="1"
            id={from.id ?? from.name}
            name={from.name}
            defaultValue={from.value ?? ""}
            type="date"
          />
        </div>
        <div className="govuk-form-group" aria-hidden="true">
          <p className="govuk-body">to</p>
        </div>
        <div className="govuk-form-group">
          <label
            className="govuk-label govuk-visually-hidden"
            htmlFor={to.id ?? to.name}
          >
            {to.label}
          </label>
          <input
            className="govuk-input govuk-!-width-full"
            step="1"
            id={to.id ?? to.name}
            name={to.name}
            defaultValue={to.value ?? ""}
            type="date"
          />
        </div>
      </div>
    </fieldset>
  );
};
