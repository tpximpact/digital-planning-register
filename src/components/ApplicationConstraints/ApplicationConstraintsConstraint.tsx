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
import { DprDesignationConstraint } from "./ApplicationConstraints.types";
import { ApplicationMapLoader } from "../ApplicationMap";

export interface ApplicationConstraintsConstraintProps {
  constraint: DprDesignationConstraint;
}

export const ApplicationConstraintsConstraint = ({
  constraint,
}: ApplicationConstraintsConstraintProps) => {
  return (
    <>
      <p className="govuk-body">{constraint.description}</p>
      {constraint.entities && constraint.entities.length > 0 && (
        <React.Fragment>
          {constraint.entities.map((entity, index) => (
            <React.Fragment key={index}>
              <hr className="govuk-section-break govuk-section-break--l" />

              {/* if there is loaded data show it! */}
              {entity.data ? (
                <>
                  {entity.data.name && (
                    <p className="govuk-body-l govuk-!-font-weight-bold">
                      {entity.data.name}
                    </p>
                  )}
                  {entity.data.description && (
                    <p className="govuk-body">{entity.data.description}</p>
                  )}
                  {entity.data.reference && (
                    <p className="govuk-body">
                      <strong>Reference:</strong> {entity.data.reference}
                    </p>
                  )}

                  {entity.data.entryDate && (
                    <p className="govuk-body">
                      <strong>Entry date:</strong> {entity.data.entryDate}
                    </p>
                  )}
                  {entity.data.startDate && (
                    <p className="govuk-body">
                      <strong>Start date:</strong> {entity.data.startDate}
                    </p>
                  )}
                  {entity.data.endDate && (
                    <p className="govuk-body">
                      <strong>End date:</strong> {entity.data.endDate}
                    </p>
                  )}
                  {entity.data.designationDate && (
                    <p className="govuk-body">
                      <strong>End date:</strong> {entity.data.designationDate}
                    </p>
                  )}

                  {entity.data.geometry && (
                    <>
                      <ApplicationMapLoader
                        reference={entity.data.entity.toString()}
                        mapData={entity.data.geometry}
                        description={`Map showing outline of the area covered for ${entity.data.entity}`}
                        mapType="constraint-accordion"
                      />
                      <br />
                    </>
                  )}

                  {entity.data.documentUrl && (
                    <p className="govuk-body">
                      <strong>Document URL:</strong>{" "}
                      <a
                        href={entity.data.documentUrl}
                        target="_blank"
                        className="govuk-link govuk-link--no-visited-state"
                        rel="noopener noreferrer"
                      >
                        {entity.data.documentUrl}
                      </a>
                    </p>
                  )}

                  {entity.data.documentationUrl && (
                    <p className="govuk-body">
                      <strong>Document URL:</strong>{" "}
                      <a
                        href={entity.data.documentationUrl}
                        target="_blank"
                        className="govuk-link govuk-link--no-visited-state"
                        rel="noopener noreferrer"
                      >
                        {entity.data.documentationUrl}
                      </a>
                    </p>
                  )}

                  {/* hidden but useful for debugging purposes */}
                  {entity.data.dataset && (
                    <p className="hidden">
                      <strong>Dataset:</strong> {entity.data.dataset}
                    </p>
                  )}
                  {entity.data.entity && (
                    <p className="hidden">
                      <strong>Entity:</strong> {entity.data.entity}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="govuk-body-l govuk-!-font-weight-bold">
                    {entity.name}
                  </p>
                  {entity.description && (
                    <p className="govuk-body">{entity.description}</p>
                  )}
                  {entity.source.text && (
                    <p className="govuk-body-s">
                      <strong>Source:</strong>{" "}
                      {"url" in entity.source && entity.source.url ? (
                        <a
                          href={entity.source.url}
                          target="_blank"
                          className="govuk-link govuk-link--no-visited-state"
                          rel="noopener noreferrer"
                        >
                          {entity.source.url || entity.source.text}
                        </a>
                      ) : (
                        entity.source.text
                      )}
                    </p>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </>
  );
};
