import { Entity } from "@/types/odp-types/shared/Constraints";
import { GeoJSON } from "geojson";

export type DprDesignationConstraint = {
  value: string;
  description: string;
  intersects: boolean;
  entities?: DprPlanningDataEntity[];
};

/**
 * Represents a combination of planning data datatypes combined into one type.
 */
export interface DprPlanningDataEntity extends Entity {
  data?: {
    name: string;
    dataset: string;
    entity: number;
    reference?: string;
    description?: string;
    geometry?: GeoJSON;
    documentUrl?: string;
    documentationUrl?: string;
    entryDate?: string;
    startDate?: string;
    endDate?: string;
    designationDate?: string;
  };
}
