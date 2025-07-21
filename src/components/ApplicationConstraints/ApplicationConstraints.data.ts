/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { fetchEntityFromPlanningData } from "@/actions/planningData";
import {
  DprDesignationConstraint,
  DprPlanningDataEntity,
} from "./ApplicationConstraints.types";
import { getEntityFromUrl } from "./ApplicationConstraints.utils";

export const fetchConstraintData = async (
  constraint: DprDesignationConstraint,
): Promise<DprDesignationConstraint> => {
  if (!constraint.entities) return constraint;
  const entities = constraint.entities;

  const updatedEntities = await Promise.allSettled(
    entities.map(async (entity: DprPlanningDataEntity) => {
      try {
        if (
          entity.source &&
          "url" in entity.source &&
          typeof entity.source.url === "string" &&
          entity.source.url.includes("planning.data.gov.uk/entity")
        ) {
          const entityId = getEntityFromUrl(entity.source.url);
          if (entityId) {
            const planningData = await fetchEntityFromPlanningData(entityId);
            if (planningData.data) {
              return { ...entity, data: planningData.data };
            }
          }
        }
        return entity;
      } catch {
        return entity;
      }
    }),
  );

  return {
    ...constraint,
    entities: updatedEntities.map((result, i) =>
      result.status === "fulfilled" ? result.value : { ...entities[i] },
    ),
  };
};
