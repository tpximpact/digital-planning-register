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
