import React from "react";
import config from "../../../util/config.json";
import { Config } from "../../../util/type";

const CouncilSelector = ({ currentPath }: { currentPath: string }) => {
  const councilConfig = config as Config;
  const councilOptions = Object.keys(councilConfig);

  const selectedCouncil = currentPath.split("/")[1] || "select";

  const handleCouncilChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCouncil = event.target.value;
    if (selectedCouncil !== "select") {
      window.location.href = `/${selectedCouncil}`;
    }
  };

  return (
    <select
      className="govuk-select"
      id="sort"
      name="council"
      value={selectedCouncil}
      onChange={handleCouncilChange}
    >
      <option value="select">Select your council</option>
      {councilOptions.map((councilKey) => (
        <option key={councilKey} value={councilKey}>
          {councilConfig[councilKey].name}
        </option>
      ))}
    </select>
  );
};

export default CouncilSelector;
