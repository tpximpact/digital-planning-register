import { capitaliseWord } from "@/util";
import { DprBoundaryGeojson } from "@/types";
import { Panel } from "../govuk/Panel";
import { Button } from "@/components/button";
import { ApplicationMapLoader } from "../ApplicationMap";
import "./comment-confirmation.scss";
import CommentHeader from "../comment-header";

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
      <CommentHeader
        council={council}
        reference={reference}
        boundary_geojson={boundary_geojson}
        address={address}
      />
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
