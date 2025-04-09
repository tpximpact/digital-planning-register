// import { useRef, useState } from "react";
import "./Dropdown.scss";

interface DropdownProps {
  children?: React.ReactNode;
  label: string;
  id: string;
  className?: string;
  options: { title: string; value: string }[];
  setSelectedOption: (value: string) => void;
}

export const Dropdown = ({
  label,
  id,
  options,
  setSelectedOption,
}: DropdownProps) => {
  return (
    <div className="govuk-grid-column-one-third dpr-dropdown">
      <div className="govuk-form-group drp-dropdown__group">
        <label htmlFor={id} className="govuk-label">
          {label}
        </label>
        <select
          id={id}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="govuk-select"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
