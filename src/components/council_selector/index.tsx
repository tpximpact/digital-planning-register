import React from "react";
import config from "../../../util/config.json";
import { Config } from "../../../util/type";

export const CouncilDropdown = () => {
  const councilConfig = config as Config;
  const councilOptions = Object.keys(councilConfig);
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname.slice(1) : "";

  const handleCouncilChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCouncil = event.target.value;
    if (selectedCouncil !== "select") {
      window.location.href = `/${selectedCouncil}`;
    }
  };

  return (
    <li className="govuk-header__navigation-item no-spacing">
      <select
        className="govuk-select"
        id="sort"
        name="council"
        value={currentPath}
        onChange={handleCouncilChange}
      >
        <option value="select">Select your council</option>
        {councilOptions.map((councilKey) => (
          <option key={councilKey} value={councilKey}>
            {councilConfig[councilKey].name}
          </option>
        ))}
      </select>
    </li>
  );
};

export default CouncilDropdown;
