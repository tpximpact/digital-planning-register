import { DprBoundaryGeojson } from "./boundary-geojson";
import { DprComment } from "./comments";
import { DprDocument } from "./document";

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
  applicant: DprPlanningApplicationApplicant;
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

export interface DprPlanningApplicationApplicant {
  name: {
    first: string;
    last: string;
    /**
     * Should we use this
     */
    title: string;
  };
  /**
   * Added unknown as a type
   */
  type:
    | "individual"
    | "company"
    | "charity"
    | "public"
    | "parishCouncil"
    | "unknown";
  ownership?: {
    interest:
      | "owner"
      | "owner.sole"
      | "owner.co"
      | "tenant"
      | "occupier"
      | "other";
  };
  company?: {
    name: string;
  };
  /**
   * if we need to show the address for sameAsSiteAddress: true then we can probably use the second address object shown here
   * UserAddress
   * Can be null atm while we wait for bops
   */
  address:
    | {
        sameAsSiteAddress: true;
      }
    | {
        sameAsSiteAddress: false;
        country?: string;
        county?: string;
        line1: string;
        line2?: string;
        postcode: string;
        town: string;
      }
    | null;
  /**
   * optional since only `Agent` has agent fields
   */
  agent?: {
    name: {
      first: string;
      last: string;
      /**
       * Should we use this
       */
      title: string;
    };

    company?: {
      name: string;
    };

    /**
     * Address
     */
    address: {
      country?: string;
      county?: string;
      line1: string;
      line2?: string;
      postcode: string;
      town: string;
    };
  };
}
