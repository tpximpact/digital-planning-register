import React from "react";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { DprBoundaryGeojson } from "@/types";
import ApplicationMap from "../application_map";

interface CommentHeaderProps {
  boundary_geojson?: DprBoundaryGeojson;
  address?: string;
  reference: string;
  council: string;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  boundary_geojson,
  address,
  reference,
  council,
}) => {
  return (
    <div className="comment-header">
      <h1 className="govuk-heading-l">Tell us what you think</h1>

      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third app-map">
          {boundary_geojson && (
            <ApplicationMap
              staticMap={true}
              zoom={10}
              mapData={boundary_geojson}
            />
          )}
        </div>
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-heading-m">{address}</h2>
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body">{reference}</p>
          <p className="govuk-body">
            Your feedback helps us improve developments so they meet the needs
            of people in {capitaliseWord(council)}. It&apos;s important you let
            us know what you think.
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CommentHeader);
