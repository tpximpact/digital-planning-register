import { capitaliseWord } from "@/util";
import { DprBoundaryGeojson } from "@/types";
import { Panel } from "../govuk/Panel";
import { Button } from "@/components/button";
import { ApplicationMapLoader } from "../ApplicationMap";

interface CommentConfirmationProps {
  reference: string;
  council: string;
  address?: string;
  boundary_geojson?: DprBoundaryGeojson;
  navigateToPage: (page: number, params?: object) => void;
}

const CommentConfirmation = ({
  reference,
  council,
  address,
  boundary_geojson,
  navigateToPage,
}: CommentConfirmationProps) => {
  return (
    <>
      <Panel titleText="Comment submitted" />
      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third grid-row-extra-bottom-margin">
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
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-heading-m">{address}</h2>
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body">{reference}</p>
          <p className="govuk-body">
            Your feedback helps us improve developments so they meet the needs
            of people in {council ? capitaliseWord(council) : "your council."}.
            It&apos;s important you let us know what you think.
          </p>
        </div>
      </div>
      <h2 className="govuk-heading-m">
        Discover other planning applications in your area
      </h2>
      <p className="govuk-body">
        If you&apos;re interested in learning more about planning applications
        in your area, you can view all currently active applications and provide
        comments on them.
      </p>
      <form action={`/${council}`} method="GET">
        <Button element="button" type="submit" variant="secondary">
          Back to application search
        </Button>
      </form>
    </>
  );
};

export default CommentConfirmation;
