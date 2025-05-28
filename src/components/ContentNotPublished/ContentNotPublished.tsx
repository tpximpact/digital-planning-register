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

export type ContentNotPublishedContentTypes = "public" | "specialist";
export const ContentNotPublished = ({
  type = "public",
}: {
  type?: ContentNotPublishedContentTypes;
}) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin">
      <div className="govuk-grid-column-two-thirds">
        <p className="govuk-hint">
          <em>
            {type === "specialist"
              ? "No comments from specialists have been published at this time."
              : "No comments from the public have been published at this time."}
          </em>
        </p>
      </div>
    </div>
  );
};
