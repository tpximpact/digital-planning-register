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
import { capitaliseWord } from "@/util";
import { DprBoundaryGeojson } from "@/types";
import { ApplicationMapLoader } from "../ApplicationMap";
import "./comment-header.scss";

interface CommentHeaderProps {
  title?: string;
  boundary_geojson?: DprBoundaryGeojson;
  address?: string;
  reference: string;
  council: string;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  title,
  boundary_geojson,
  address,
  reference,
  council,
}) => {
  const content = (
    <div className="comment-header__map-data grid-row-extra-bottom-margin">
      <div className="comment-header__map">
        {boundary_geojson && (
          <ApplicationMapLoader
            reference={reference}
            mapData={boundary_geojson}
            description="Interactive map showing the location of the application"
            mapType="application-show"
            // mapType="context-setter"
          />
        )}
      </div>
      <div className="comment-header__map__data">
        <h2 className="govuk-heading-m">{address}</h2>
        <h2 className="govuk-heading-s">Application Reference</h2>
        <p className="govuk-body">{reference}</p>
        <p className="govuk-body">
          Your feedback helps us improve developments so they meet the needs of
          people in {council ? capitaliseWord(council) : "your council."}.
          It&apos;s important you let us know what you think.
        </p>
      </div>
    </div>
  );

  if (title) {
    return (
      <div className="comment-header">
        <h1 className="govuk-heading-l">{title}</h1>
        {content}
      </div>
    );
  } else {
    return content;
  }
};

export default React.memo(CommentHeader);
