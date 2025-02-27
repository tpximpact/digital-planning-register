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

import { DprApplicationSubmissionSubtopicValue } from "@/types";
import { ApplicationMapLoader } from "../ApplicationMap";

export const Row = ({
  description,
  value,
  map,
}: DprApplicationSubmissionSubtopicValue): React.ReactNode => {
  if (!map && value === null) {
    return null;
  }

  // @todo apply <SummaryList /> <SummaryCard /> components here
  return (
    <dl className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{description}</dt>
      <dd className="govuk-summary-list__value">
        {/* show a map if map is present */}
        {map && (
          <ApplicationMapLoader
            reference={`${description.split(" ").join("-")}-application-submission`}
            mapData={map}
            description="Interactive map showing the location of the application"
            mapType="application-show"
          />
        )}
        {typeof value === "string" ? (
          <p className="govuk-body">{value}</p>
        ) : (
          <>{value}</>
        )}
      </dd>
    </dl>
  );
};
