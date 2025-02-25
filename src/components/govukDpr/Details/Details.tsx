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

import "./Details.scss";

export interface DetailsProps {
  summaryText: JSX.Element | string;
  text: JSX.Element | string;
  isInverted?: boolean;
}

export const Details = ({
  summaryText,
  text,
  isInverted = false,
}: DetailsProps) => {
  return (
    <details
      className={`govuk-details ${isInverted ? "govuk-details--inverted" : ""}`}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summaryText}</span>
      </summary>
      <div className="govuk-details__text">{text}</div>
    </details>
  );
};
