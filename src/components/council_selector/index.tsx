import React, { useEffect, useState } from "react";
import config from "../../../util/config.json";
import { Config } from "@/types";

interface CouncilSelectorProps {
  currentPath: string;
}

const CouncilSelector = ({ currentPath }: CouncilSelectorProps) => {
  const councilConfig = config as Config;
  const councilOptions = Object.keys(councilConfig);
  const [selectedCouncil, setSelectedCouncil] = useState(
    currentPath.split("/")[1] || "select",
  );

  useEffect(() => {
    document.documentElement.className = "js-enabled";
    setSelectedCouncil(currentPath.split("/")[1]);
  }, [currentPath]);

  const handleCouncilChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCouncil = event.target.value;
    if (selectedCouncil !== "select") {
      window.location.href = `/${selectedCouncil}`;
    }
  };

  return (
    <>
      <noscript>
        <style>{`.js-only { display: none; }`}</style>
        <form action="/council-redirect" method="get">
          <div>
            <select
              className="govuk-select noscript-only council-selection"
              id="council-select-noscript"
              name="council"
              defaultValue={selectedCouncil}
              aria-label="Select your council"
              autoComplete="on"
            >
              <option value="select">Select your council</option>
              {councilOptions.map((councilKey) => (
                <option key={councilKey} value={councilKey}>
                  {councilConfig[councilKey].name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="govuk-button custom-button council-selection"
            >
              Select
            </button>
          </div>
        </form>
      </noscript>
      <select
        className="govuk-select js-only"
        id="council-select"
        name="council"
        value={selectedCouncil}
        onChange={handleCouncilChange}
        aria-label="Select your council"
        autoComplete="on"
      >
        <option value="select">Select your council</option>
        {councilOptions.map((councilKey) => (
          <option key={councilKey} value={councilKey}>
            {councilConfig[councilKey].name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CouncilSelector;
