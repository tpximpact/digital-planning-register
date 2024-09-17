import { DprBoundaryGeojson } from "./boundary-geojson";
import { DprComment } from "./comments";
import { DprDocument } from "./document";

/**
 * This interface represents a minimal application object
 * @todo this should align closely with ODP not BOPS
 */
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
  digitalSiteNotice: DigitalSiteNotice | null;
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
  digitalSiteNotice: DigitalSiteNotice | null;

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

interface ProposedLandUse {
  classA: boolean;
  classB: boolean;
  classC: boolean;
  classD: boolean;
  classE: boolean;
}

interface Housing {
  residentialUnits: number;
  affordableResidentialUnits: number;
}

interface Jobs {
  min: number;
  max: number;
}

interface DigitalSiteNotice {
  name: string;
  proposedLandUse: ProposedLandUse;
  height: number;
  constructionTime: string;
  showHousing: boolean;
  housing: Housing;
  showOpenSpace: boolean;
  openSpaceArea: number;
  showJobs: boolean;
  jobs: Jobs;
  showCarbon: boolean;
  carbonEmissions: number;
  showAccess: boolean;
  access: string;
}
