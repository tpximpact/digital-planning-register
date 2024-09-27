import { DprBoundaryGeojson } from "./boundaryGeojson";
import { DprPlanningApplicationOverview } from "./planningApplication";

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
}
