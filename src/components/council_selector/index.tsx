import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/util";
import { Config } from "@/types";

interface CouncilSelectorProps {
  currentPath: string;
  councilConfig: Config;
}

const CouncilSelector = ({
  currentPath,
  councilConfig,
}: CouncilSelectorProps) => {
  const [selectedCouncil, setSelectedCouncil] = useState(
    currentPath.split("/")[1] || "select",
  );

  const councilKeys = Object.keys(councilConfig);
  const councilOptions = councilKeys.filter(
    (councilKey) => councilConfig[councilKey].visibility == "public",
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
              {councilOptions?.map((councilKey: string) => (
                <option key={councilKey} value={councilKey}>
                  {capitalizeFirstLetter(councilKey)}
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
        {councilOptions?.map((councilKey: string) => (
          <option key={councilKey} value={councilKey}>
            {capitalizeFirstLetter(councilKey)}
          </option>
        ))}
      </select>
    </>
  );
};

export default CouncilSelector;
