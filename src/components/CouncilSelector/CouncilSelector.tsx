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

"use client";
import React, { useEffect, useState } from "react";
import "./CouncilSelector.scss";
import { AppConfig } from "@/config/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";

export interface CouncilSelectorProps {
  councils: AppConfig["councils"];
  selectedCouncil?: AppConfig["council"];
}

/**
 * @deprecated
 * @param param0
 * @returns
 */
export const CouncilSelector = ({
  councils,
  selectedCouncil,
}: CouncilSelectorProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(selectedCouncil?.slug ?? "select");

  useEffect(() => {
    setSelected(selectedCouncil?.slug ?? "select");
  }, [selectedCouncil]);

  const availableCouncils = councils.filter(
    (council) => council.visibility === "public",
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = event.target.value;
    setSelected(selectedSlug);
    if (selectedSlug !== "select") {
      router.push(`/${selectedSlug}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <>
      {availableCouncils && availableCouncils.length > 0 && (
        <form action="/" method="" className="dpr-council-selector">
          <div className="govuk-form-group">
            <span id="council-select-label" className="govuk-visually-hidden">
              Select your council
            </span>

            <select
              className="govuk-select"
              id="council-select"
              name="council"
              aria-labelledby="council-select-label"
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
            <Button
              type="submit"
              className="hidden-js-enabled"
              variant="default"
            >
              Select
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
