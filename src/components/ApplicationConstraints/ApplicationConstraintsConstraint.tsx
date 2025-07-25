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

import React from "react";
import { DprPlanningDataEntity } from "./ApplicationConstraints.types";
import { ApplicationMapLoader } from "../ApplicationMap";

export interface ApplicationConstraintsConstraintProps {
  constraint: DprPlanningDataEntity;
}

export const ApplicationConstraintsConstraint = ({
  constraint,
}: ApplicationConstraintsConstraintProps) => {
  return (
    <>
      {/* if there is loaded data show it! */}
      {constraint.data ? (
        <>
          {constraint.data.description && (
            <p className="govuk-body">{constraint.data.description}</p>
          )}
          {constraint.data.reference && (
            <p className="govuk-body">
              <strong>Reference:</strong> {constraint.data.reference}
            </p>
          )}

          {constraint.data.entryDate && (
            <p className="govuk-body">
              <strong>Entry date:</strong> {constraint.data.entryDate}
            </p>
          )}
          {constraint.data.startDate && (
            <p className="govuk-body">
              <strong>Start date:</strong> {constraint.data.startDate}
            </p>
          )}
          {constraint.data.endDate && (
            <p className="govuk-body">
              <strong>End date:</strong> {constraint.data.endDate}
            </p>
          )}
          {constraint.data.designationDate && (
            <p className="govuk-body">
              <strong>End date:</strong> {constraint.data.designationDate}
            </p>
          )}

          {constraint.data.geometry && (
            <>
              <ApplicationMapLoader
                reference={constraint.data.entity.toString()}
                mapData={constraint.data.geometry}
                description={`Map showing outline of the area covered for ${constraint.data.entity}`}
                mapType="constraint-accordion"
              />
              <br />
            </>
          )}

          {constraint.data.documentUrl && (
            <p className="govuk-body">
              <strong>Document URL:</strong>{" "}
              <a
                href={constraint.data.documentUrl}
                target="_blank"
                className="govuk-link govuk-link--no-visited-state"
                rel="noopener noreferrer"
              >
                {constraint.data.documentUrl}
              </a>
            </p>
          )}

          {constraint.data.documentationUrl && (
            <p className="govuk-body">
              <strong>Document URL:</strong>{" "}
              <a
                href={constraint.data.documentationUrl}
                target="_blank"
                className="govuk-link govuk-link--no-visited-state"
                rel="noopener noreferrer"
              >
                {constraint.data.documentationUrl}
              </a>
            </p>
          )}

          {/* hidden but useful for testing & debugging purposes */}
          {constraint.data.dataset && (
            <p className="hidden" data-field="dataset">
              <strong>Dataset:</strong> {constraint.data.dataset}
            </p>
          )}
          {constraint.data.entity && (
            <p className="hidden">
              <strong>Entity:</strong> {constraint.data.entity}
            </p>
          )}
        </>
      ) : (
        <>
          {constraint.description && (
            <p className="govuk-body">{constraint.description}</p>
          )}
          {constraint.source.text && (
            <p className="govuk-body-s">
              <strong>Source:</strong>{" "}
              {"url" in constraint.source && constraint.source.url ? (
                <a
                  href={constraint.source.url}
                  target="_blank"
                  className="govuk-link govuk-link--no-visited-state"
                  rel="noopener noreferrer"
                >
                  {constraint.source.url || constraint.source.text}
                </a>
              ) : (
                constraint.source.text
              )}
            </p>
          )}
        </>
      )}
    </>
  );
};
