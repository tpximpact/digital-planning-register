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
import React, { useState } from "react";
import "./DetailsCheckboxAccordion.scss";

export interface DetailsCheckboxAccordionProps<T> {
  title: string;
  name: string;
  options: T[];
  checkedOptions?: T[];
  content?: string | React.ReactNode;
}

export function DetailsCheckboxAccordion<T>({
  title,
  name,
  options,
  checkedOptions,
  content,
}: DetailsCheckboxAccordionProps<T>) {
  const [checked, setChecked] = useState<T[]>(checkedOptions ?? []);

  if (!options || options.length === 0) {
    return null;
  }

  const handleCheckboxChange = (option: T, isChecked: boolean) => {
    if (isChecked) {
      setChecked([...checked, option]);
    } else {
      setChecked(checked.filter((v) => v !== option));
    }
  };

  let col1: T[] = options;
  let col2: T[] = [];

  if (options.length > 10) {
    const mid = Math.ceil(options.length / 2);
    col1 = options.slice(0, mid);
    col2 = options.slice(mid);
  }
  return (
    <details
      className="dpr-details-checkbox-accordion"
      //  useful for debugging
      // {...(checkedOptions ? { open: true } : {})}
      name={name}
    >
      <summary>
        <p className="govuk-heading-m" role="heading" aria-level={2}>
          <span>
            <span className="govuk-visually-hidden">Open section: </span>
            {title}
          </span>
        </p>
        <p className="govuk-hint">
          <span>{checked.length} selected</span>
        </p>
        <div
          className="dpr-details-checkbox-accordion__chevron"
          aria-hidden={true}
        >
          <span></span>
        </div>
      </summary>
      <fieldset className="govuk-fieldset dpr-details-checkbox-accordion__content">
        {content && content}
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m govuk-visually-hidden">
          {title}
        </legend>
        <div className="govuk-checkboxes govuk-checkboxes--small">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              {col1.map((option, index) => (
                <Checkbox<T>
                  key={`col1-${index}`}
                  name={name}
                  option={option}
                  checked={checked.includes(option)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
            <div className="govuk-grid-column-one-half">
              {col2.map((option, index) => (
                <Checkbox<T>
                  key={`col2-${index}`}
                  name={name}
                  option={option}
                  checked={checked.includes(option)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          </div>
        </div>
      </fieldset>
    </details>
  );
}

type CheckboxProps<T> = {
  name: string;
  option: T;
  checked: boolean;
  onChange: (option: T, isChecked: boolean) => void;
};

function Checkbox<T>({ name, option, checked, onChange }: CheckboxProps<T>) {
  return (
    <div className="govuk-checkboxes__item">
      <input
        className="govuk-checkboxes__input"
        id={`${name}-${String(option)}`}
        name={name}
        type="checkbox"
        value={String(option)}
        checked={checked}
        onChange={(e) => onChange(option, e.target.checked)}
      />
      <label
        className="govuk-label govuk-checkboxes__label"
        htmlFor={`${name}-${String(option)}`}
      >
        {String(option)}
      </label>
    </div>
  );
}
