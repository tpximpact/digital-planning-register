import { DprPlanningApplicationOverview } from "../definitions/planning-application";
import { BopsSearchMetadata, BopsSearchLinks } from "../api/bops";

interface Site {
  address_1: string;
  address_2: string;
  county: string;
  town: string;
  postcode: string;
  uprn: number;
  latitude: number;
  longitude: number;
}

interface DSNPlanningApplication {
  site_notice_content: string;
  site: Site;
  reference: string;
  boundary_geojson: DprBoundaryGeojson;
}
export interface DSNApplicationListings {
  pagination: DprPagination;
  data: DSNPlanningApplication[];
}
