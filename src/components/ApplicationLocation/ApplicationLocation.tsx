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

export const ApplicationLocation = () => {
  return (
    <>
      {/* Add real data when available */}
      <h2 className="govuk-heading-l">Location</h2>
      <div className="govuk-grid-row  grid-row-extra-bottom-margin">
        <div className="govuk-grid-column">
          <div className="govuk-grid-column-one-quarter">
            <h3 className="govuk-heading-s">Property type</h3>
            <p className="govuk-body">Smallholding</p>
          </div>
        </div>

        <div className="govuk-grid-column">
          <div className="govuk-grid-column-one-quarter">
            <h3 className="govuk-heading-s">Region</h3>
            <p className="govuk-body">London</p>
          </div>
        </div>

        <div className="govuk-grid-column">
          <div className="govuk-grid-column-one-quarter">
            <h3 className="govuk-heading-s">Local authority district</h3>
            <p className="govuk-body">Camden</p>
          </div>
        </div>

        <div className="govuk-grid-column">
          <div className="govuk-grid-column-one-quarter">
            <h3 className="govuk-heading-s">Energy Performance Certificate</h3>
            <p className="govuk-body">(string)</p>
          </div>
        </div>
      </div>
    </>
  );
};
