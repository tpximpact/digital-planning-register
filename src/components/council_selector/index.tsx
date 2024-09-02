import React, { useEffect, useState } from "react";
import { getConfig } from "@/actions";

interface CouncilSelectorProps {
  currentPath: string;
}

const CouncilSelector = ({ currentPath }: CouncilSelectorProps) => {
  const [selectedCouncil, setSelectedCouncil] = useState(
    currentPath.split("/")[1] || "select",
  );
  const [councilOptions, setCouncilOptions] = useState<string[]>();

  useEffect(() => {
    document.documentElement.className = "js-enabled";
    setSelectedCouncil(currentPath.split("/")[1]);
    const updateCouncilSelector = async () => {
      const councilConfig = await getConfig();
      const councilOptions = Object.keys(councilConfig);
      const filteredCouncilConfig = councilOptions.filter(
        (councilKey) => councilConfig[councilKey].isSelectable == "true",
      );
      setCouncilOptions(filteredCouncilConfig);
    };
    updateCouncilSelector();
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
              {councilOptions?.map((councilKey) => (
                <option key={councilKey} value={councilKey}>
                  {councilKey}
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
        {councilOptions?.map((councilKey) => (
          <>
            {
              <option key={councilKey} value={councilKey}>
                {councilKey}
              </option>
            }
          </>
        ))}
      </select>
    </>
  );
};

export default CouncilSelector;
