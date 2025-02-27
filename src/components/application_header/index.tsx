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

import React from "react";

interface ApplicationHeaderProps {
  reference: string;
  address?: string;
}

export const ApplicationHeader = ({
  reference,
  address,
}: ApplicationHeaderProps) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin ">
      <div className="govuk-grid-column-one-quarter">
        <h1 className="govuk-heading-s">Application Reference</h1>
        <p className="govuk-body">{reference}</p>
      </div>
      {address && (
        <div className="govuk-grid-column-one-quarter">
          <h2 className="govuk-heading-s">Address</h2>
          <div className="govuk-body">{address}</div>
        </div>
      )}
    </div>
  );
};

export default ApplicationHeader;
