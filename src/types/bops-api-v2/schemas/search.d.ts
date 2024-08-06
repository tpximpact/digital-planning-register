/**
 * #/components/schemas/Search
 */

import { DprBoundaryGeojson } from "@/types/definitions/boundary-geojson";
import { ApplicationOverview } from "../definitions/application-overview";

interface Search {
  metadata: SearchMetadata;
  links: SearchLinks;
  data: {
    application: ApplicationOverview;
    property: {
      address: {
        latitude: number;
        longitude: number;
        title: string;
        singleLine: string;
        uprn: string;
        town: string;
        postcode: string;
      };
      boundary: {
        site: DprBoundaryGeojson;
      };
    };
    proposal: {
      description: string;
    };
  }[];
}

/**
 * Aligned with #/components/schemas/Search https://camden.bops-staging.services/api/docs/v2/swagger_doc.yaml
 */
export type SearchMetadata = {
  results: number;
  total_results: number;
  page: number;
  from: number;
  to: number;
  total_pages: number;
};

/**
 * Aligned with #/components/schemas/Search https://camden.bops-staging.services/api/docs/v2/swagger_doc.yaml
 */
export type SearchLinks = {
  first: string;
  last: string;
  prev: string;
  next: string;
};
