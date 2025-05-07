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

import { DprApplication } from "@/types";
import "./ContextSetter.scss";
import { getPropertyAddress } from "@/lib/planningApplication/application";
import Link from "next/link";
import { createPathFromParams } from "@/lib/navigation";
import { ApplicationMapLoader } from "../ApplicationMap";

export interface ContextSetterProps {
  councilSlug: string;
  reference: string;
  application: DprApplication;
}

export const ContextSetter = ({
  councilSlug,
  reference,
  application,
}: ContextSetterProps) => {
  if (!application) {
    return null;
  }
  const address = getPropertyAddress(
    application?.submission?.data?.property?.address,
  );
  const boundary_geojson =
    application?.submission?.data?.property?.boundary?.site;
  return (
    <div
      className={`dpr-context-setter${boundary_geojson ? "" : " dpr-context-setter--no-map"}`}
    >
      <div className="dpr-context-setter__map-data">
        {boundary_geojson && (
          <div className="dpr-context-setter__map">
            <ApplicationMapLoader
              reference={reference}
              mapData={boundary_geojson}
              description="Interactive map showing the location of the application"
              mapType="context-setter"
            />
          </div>
        )}
        <div className="dpr-context-setter__data">
          <p className="govuk-heading-m">{address}</p>
          <p className="govuk-heading-s">Application Reference</p>
          <p>
            <Link
              className="govuk-body-m govuk-link"
              href={createPathFromParams(
                { council: councilSlug, reference },
                application.data.application.reference,
              )}
            >
              {application.data.application.reference}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
