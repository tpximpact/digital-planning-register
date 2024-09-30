import { DprBoundaryGeojson } from "./boundaryGeojson";
import { DprPlanningApplicationOverview } from "./planningApplication";

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
  // applicant: DprPlanningApplicationApplicant;
}
