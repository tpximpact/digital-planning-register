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
