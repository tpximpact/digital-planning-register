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
import "./Dropdown.scss";

interface DropdownProps {
  children?: React.ReactNode;
  label: string;
  id: string;
  className?: string;
  options: { title: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export const Dropdown = ({
  label,
  id,
  options,
  value,
  onChange,
}: DropdownProps) => {
  return (
    <div className="govuk-grid-column-one-third dpr-dropdown">
      <div className="govuk-form-group drp-dropdown__group">
        <label htmlFor={id} className="govuk-label">
          {label}
        </label>
        <select
          id={id}
          onChange={onChange}
          className="govuk-select"
          value={value}
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
