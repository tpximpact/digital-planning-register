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

import { SpecialistRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import "./SpecialistReason.scss";

export type SpecialistReasonProps = Pick<
  SpecialistRedacted,
  "constraints" | "reason"
>;

export const SpecialistReason = ({
  reason,
  constraints,
}: SpecialistReasonProps) => {
  if (!reason) return null;

  const isConstraint =
    reason?.toLowerCase() === "constraint" &&
    Array.isArray(constraints) &&
    constraints.length > 0;

  if (isConstraint) {
    return (
      <div className="specialist-reason">
        {constraints.map((constraint, index) => (
          <section key={index}>
            <p className="govuk-body">
              {constraint.description ?? "No description provided"}
            </p>
            {constraint.intersects &&
              Array.isArray(constraint.entities) &&
              constraint.entities.length > 0 && (
                <ul className="govuk-list govuk-list--bullet">
                  {constraint.entities.map((entity, entityIndex) => (
                    <li
                      className="govuk-list__item"
                      key={`${index}-${entityIndex}`}
                    >
                      {"source" in entity &&
                      entity.source &&
                      typeof entity.source === "object" &&
                      "url" in entity.source &&
                      typeof (entity.source as { url?: unknown }).url ===
                        "string" ? (
                        <a
                          className="govuk-link"
                          href={(entity.source as { url: string }).url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {entity.name ?? "Unnamed entity"}
                        </a>
                      ) : (
                        (entity.name ?? "Unnamed entity")
                      )}
                    </li>
                  ))}
                </ul>
              )}
          </section>
        ))}
      </div>
    );
  }

  return <p className="govuk-body">{reason}</p>;
};
