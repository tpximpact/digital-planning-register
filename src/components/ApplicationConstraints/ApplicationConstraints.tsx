"use client";
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

import {
  filterConstraints,
  prepareConstraints,
} from "./ApplicationConstraints.utils";
import { Accordion, AccordionSection } from "../Accordion";
import { useRef, useState } from "react";
import { fetchConstraintData } from "./ApplicationConstraints.data";
import {
  PlanningConstraint,
  PlanningDesignation,
} from "@/types/odp-types/shared/Constraints";
import { DprDesignationConstraint } from "./ApplicationConstraints.types";
import { ApplicationConstraintsConstraint } from "@/components/ApplicationConstraints/ApplicationConstraintsConstraint";
export interface ApplicationConstraintsProps {
  constraints: (PlanningDesignation | PlanningConstraint)[];
}

export const ApplicationConstraints = ({
  constraints,
}: ApplicationConstraintsProps) => {
  const loaded = useRef<Record<string, boolean>>({});
  const [data, setData] = useState<Record<string, DprDesignationConstraint>>(
    {},
  );
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  if (!constraints || constraints.length === 0) {
    return null;
  }
  const preparedConstraints = prepareConstraints(constraints);
  const intersectingConstraints = filterConstraints(preparedConstraints);

  const handleToggle = async (
    event: React.SyntheticEvent<HTMLDetailsElement>,
    constraint: DprDesignationConstraint,
  ) => {
    const name = event.currentTarget.getAttribute("name") || "";
    const open = event.currentTarget.open;
    setOpenSections((prev) => ({ ...prev, [name]: open }));

    if (open && !loaded.current[name]) {
      const result = await fetchConstraintData(constraint);
      setData((prev) => ({ ...prev, [name]: result }));
      loaded.current[name] = true;
    }
  };

  return (
    <>
      <h2 className="govuk-heading-l">Constraints</h2>
      <p className="govuk-hint">
        These policies apply to this application, and will need to be taken into
        consideration by the planning team when assessing this application.
      </p>

      <Accordion name={"applicationConstraints"}>
        {intersectingConstraints.map((constraint, i) => {
          const uniqueName = `${i}-${constraint.value.replace(" ", "")}`;
          return (
            <AccordionSection
              title={constraint.description}
              name={uniqueName}
              key={uniqueName}
              open={!!openSections[constraint.value]}
              onToggle={(event) => handleToggle(event, constraint)}
              headingLevel={3}
            >
              {data[uniqueName] ? (
                <ApplicationConstraintsConstraint
                  constraint={data[uniqueName]}
                />
              ) : openSections[uniqueName] ? (
                <p className="govuk-body">Loading...</p>
              ) : (
                <ApplicationConstraintsConstraint constraint={constraint} />
              )}
            </AccordionSection>
          );
        })}
      </Accordion>
    </>
  );
};
