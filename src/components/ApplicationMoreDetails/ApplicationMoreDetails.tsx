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

export const ApplicationMoreDetails = () => {
  return (
    <>
      <h2 className="govuk-heading-l">Application</h2>

      {/* Uncomment when real data available */}
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <h3 className="govuk-heading-s">Project type</h3>
          <p className="govuk-body">Alter a building</p>
        </div>

        <div className="govuk-grid-column-one-third">
          <h3 className="govuk-heading-s">Estimated start date</h3>
          <p className="govuk-body">01-04-2025</p>
        </div>

        <div className="govuk-grid-column-one-third">
          <h3 className="govuk-heading-s">Estimated completion date</h3>
          <p className="govuk-body">01-04-2025</p>
        </div>
      </div>

      <div className="govuk-grid-row  grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third">
          <h3 className="govuk-heading-s">Extention</h3>
          <p className="govuk-body">30 m2</p>
        </div>

        <div className="govuk-grid-column-two-thirds">
          <h3 className="govuk-heading-s">Vehicle parking</h3>
          <p className="govuk-body">
            Bicycles: 1 off street <br /> Car: 1 on street
          </p>
        </div>
      </div>
      {/* Not clear if we are having on MVP */}
      <h2 className="govuk-heading-l">Related Applications</h2>
      <ul className="govuk-list govuk-list--bullet grid-row-extra-bottom-margin">
        <li>
          <a href="#" className="govuk-link govuk-link--no-visited-state">
            Pre-application - 2024/0452/C
          </a>
        </li>
        <li>
          <a href="#" className="govuk-link govuk-link--no-visited-state">
            Conditions of construction - 2024/0685/A
          </a>
        </li>
      </ul>
    </>
  );
};
