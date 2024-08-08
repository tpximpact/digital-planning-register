import { BopsBoundaryGeojson } from "../api/bops";

/**
 * This is our custom definition for the boundary geojson object but its identical to the BOPS one...
 * @todo refine this formate further to be more generic
 */
export interface DprBoundaryGeojson extends BopsBoundaryGeojson {}
