"use client";
import React from "react";
import config from "../../../util/config.json";
import { Config } from "../../../util/type";

export const CouncilSelector = () => {
  const councilConfig = config as Config;
  const councilOptions = Object.keys(councilConfig);

  const getCurrentCouncil = () => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      return pathParts.length > 1 ? pathParts[1] : "";
    }
    return "";
  };

  const currentCouncil = getCurrentCouncil();

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
      value={currentCouncil}
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
