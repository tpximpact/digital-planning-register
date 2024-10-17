import React, { useState } from "react";
import "./CouncilSelector.scss";
import { AppConfig } from "@/config/types";
import { useRouter } from "next/navigation";
import { Button } from "../button";

export interface CouncilSelectorProps {
  councils: AppConfig["councils"];
  selectedCouncil?: AppConfig["council"];
}

export const CouncilSelector = ({
  councils,
  selectedCouncil,
}: CouncilSelectorProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(selectedCouncil?.slug ?? "select");

  const availableCouncils = councils.filter(
    (council) => council.visibility === "public",
  );

  const handleChange = (event) => {
    const selectedSlug = event.target.value;
    setSelected(selectedSlug);
    if (selectedSlug !== "select") {
      router.push(`/${selectedSlug}`);
    }
  };
  return (
    <>
      {availableCouncils && availableCouncils.length > 0 && (
        <form action="/" method="" className="dpr-council-selector">
          <div className="govuk-form-group">
            <label
              className="govuk-label govuk-visually-hidden"
              htmlFor="council-select"
            >
              Select your council
            </label>

            <select
              className="govuk-select"
              id="council-select"
              name="council"
              aria-label="Select your council"
              autoComplete="on"
              value={selected}
              onChange={handleChange}
            >
              <option value="select">Select your council</option>
              {availableCouncils?.map((council) => (
                <option key={council.slug} value={council.slug}>
                  {council.name}
                </option>
              ))}
            </select>

            <noscript>
              <Button type="submit" content="Select" />
            </noscript>
          </div>
        </form>
      )}
    </>
  );
};
