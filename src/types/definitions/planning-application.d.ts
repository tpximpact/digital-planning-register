import { DprBoundaryGeojson } from "./boundary-geojson";
import { DprComment } from "./comments";
import { DprDocument } from "./document";

/**
 * This interface represents a minimal application object
 * @todo this should align closely with ODP not BOPS
 */

interface AgentAddress {
  town: string;
  line1: string;
  postcode: string;
}
interface Agent {
  address: string;
}
/** we don't have any schema showing the options in Bops
 * @todo update the right schema when we get from Bops
 */
interface ApplicantAddress {
  sameAsSiteAddress: boolean;
}
export interface DprPlanningApplication {
  application: DprPlanningApplicationOverview;
  property: {
    address: {
      singleLine: string;
    };
    boundary: {
      site: DprBoundaryGeojson;
    };
  };
  proposal: {
    description: string;
  };
  applicant: {
    type: string;
    address: string;
    agent: Agent;
  };
}

export interface DprPlanningApplicationOverview {
  reference: string;
  type: {
    description: string;
  };
  status: string;
  consultation: {
    endDate: string | null;
    /**
     * NB: These are only included in BOPS details call not search one
     */
    publishedComments: DprComment[] | null;
    /**
     * NB: These are only included in BOPS details call not search one
     */
    consulteeComments: DprComment[] | null;
  };
  receivedAt: string;
  publishedAt?: string | null;
  determinedAt?: string | null;
  decision?: string | null;
  validAt: string | null;

  /**
   * @todo this is missing from the public BOPS response
   */
  id: number;
  /**
   * @todo this is missing from the public BOPS response
   */
  applicant_first_name: string;
  /**
   * @todo this is missing from the public BOPS response
   */
  applicant_last_name: string;
  /**
   * @todo this is missing from the public BOPS response
   */
  agent_first_name: string;
  /**
   * @todo this is missing from the public BOPS response
   */
  agent_last_name: string;

  /**
   * @todo this is missing from the public BOPS response BUT we have a new public endpoint for them
   */
  documents: DprDocument[] | null;
}
