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

export const ApplicationConstraints = () => {
  return (
    <>
      <h2 className="govuk-heading-l">Constraints</h2>
      <p className="govuk-body">
        <em>
          Planning constraints, guidance and designations that intersect with
          the proposed site
        </em>
      </p>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <h3 className="govuk-heading-s">General policy</h3>
          <p className="govuk-body">Article 4 direction areas</p>
          <p className="govuk-body">
            <a href="/" className="govuk-link govuk-link--no-visited-state">
              Source
            </a>
          </p>
        </div>

        <div className="govuk-grid-column-one-third">
          <h3 className="govuk-heading-s">Heritage conservation area</h3>
          <p className="govuk-body">
            <a href="/" className="govuk-link govuk-link--no-visited-state">
              Source
            </a>
          </p>
        </div>

        <div className="govuk-grid-column-one-third">
          <h3 className="govuk-heading-s">General policy</h3>
          <p className="govuk-body">Classified roads</p>
          <p className="govuk-body">
            <a href="/" className="govuk-link govuk-link--no-visited-state">
              Source
            </a>
          </p>
        </div>
      </div>

      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-two-thirds">
          <h3 className="govuk-heading-m">Sources</h3>
          <p className="govuk-body">
            <em>
              A list of open data requests or websites that explain how these
              constraints were sourced
            </em>
          </p>
          <p className="govuk-body">
            <a href="/" className="govuk-link govuk-link--no-visited-state">
              DE-9IM spatial relationship definition of intersects
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
